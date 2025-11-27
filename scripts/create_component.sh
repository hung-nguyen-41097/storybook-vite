#!/usr/bin/env bash
# create_component.sh
# Creates a skeleton React+TypeScript component under src/stories.
# Usage: ./scripts/create_component.sh ComponentName [--no-story] [--no-scss] [--no-index]

set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 ComponentName [--no-story] [--no-scss] [--no-index]"
  exit 1
fi

NAME="$1"
shift || true

# Validate component name (PascalCase)
if ! [[ "$NAME" =~ ^[A-Z][A-Za-z0-9]+$ ]]; then
  echo "ComponentName must be PascalCase (e.g. MyButton). Received: $NAME"
  exit 1
fi

WITH_STORY=1
WITH_SCSS=1
WITH_INDEX=1

while (("$#")); do
  case "$1" in
    --no-story) WITH_STORY=0 ;;
    --no-scss) WITH_SCSS=0 ;;
    --no-index) WITH_INDEX=0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

COMP_DIR="src/stories/$NAME"
COMP_FILE="$COMP_DIR/$NAME.tsx"
SCSS_FILE="$COMP_DIR/$(echo "$NAME" | tr '[:upper:]' '[:lower:]').scss"
STORY_FILE="$COMP_DIR/$NAME.stories.ts"
INDEX_FILE="$COMP_DIR/index.ts"

mkdir -p "$COMP_DIR"
TEMPLATE_DIR="scripts/templates"

# compute kebab-case from PascalCase NAME (portable: avoid GNU sed \L)
# Example: MyButton -> my-button
KEBAB=$(printf '%s' "$NAME" | sed -E 's/([A-Z])/-\1/g' | tr '[:upper:]' '[:lower:]' | sed 's/^-//')

# Helper to render a template by replacing placeholders
render_template() {
  local tpl="$1" dst="$2"
  sed -e "s/{{NAME}}/$NAME/g" -e "s/{{kebab}}/$KEBAB/g" "$tpl" > "$dst"
}

# Create component file from template
render_template "$TEMPLATE_DIR/component.tsx.tpl" "$COMP_FILE"

# Create CSS file
if [ $WITH_SCSS -eq 1 ]; then
  render_template "$TEMPLATE_DIR/style.scss.tpl" "$SCSS_FILE"
fi

# Create Storybook story
if [ $WITH_STORY -eq 1 ]; then
  render_template "$TEMPLATE_DIR/story.ts.tpl" "$STORY_FILE"
fi

chmod 644 "$COMP_FILE" || true
[ -f "$SCSS_FILE" ] && chmod 644 "$SCSS_FILE" || true
[ -f "$STORY_FILE" ] && chmod 644 "$STORY_FILE" || true
[ -f "$INDEX_FILE" ] && chmod 644 "$INDEX_FILE" || true

printf "Created component skeleton at %s\n" "$COMP_DIR"

# Print a short summary
echo "Files created:"
ls -1 "$COMP_DIR" || true

exit 0
