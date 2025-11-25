#!/usr/bin/env bash
# create_component.sh
# Creates a skeleton React+TypeScript component under src/stories.
# Usage: ./scripts/create_component.sh ComponentName [--no-story] [--no-css] [--no-index]

set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 ComponentName [--no-story] [--no-css] [--no-index]"
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
WITH_CSS=1
WITH_INDEX=1

while (("$#")); do
  case "$1" in
    --no-story) WITH_STORY=0 ;;
    --no-css) WITH_CSS=0 ;;
    --no-index) WITH_INDEX=0 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
  shift
done

COMP_DIR="src/stories/$NAME"
COMP_FILE="$COMP_DIR/$NAME.tsx"
CSS_FILE="$COMP_DIR/$(echo "$NAME" | tr '[:upper:]' '[:lower:]').css"
STORY_FILE="$COMP_DIR/$NAME.stories.ts"
INDEX_FILE="$COMP_DIR/index.ts"

mkdir -p "$COMP_DIR"
TEMPLATE_DIR="scripts/templates"

# compute kebab-case from PascalCase NAME
KEBAB=$(echo "$NAME" | sed -E 's/([A-Z])/-\L\1/g' | sed 's/^-//')

# Helper to render a template by replacing placeholders
render_template() {
  local tpl="$1" dst="$2"
  sed -e "s/{{NAME}}/$NAME/g" -e "s/{{kebab}}/$KEBAB/g" "$tpl" > "$dst"
}

# Create component file from template
render_template "$TEMPLATE_DIR/component.tsx.tpl" "$COMP_FILE"

# Create CSS file
if [ $WITH_CSS -eq 1 ]; then
  render_template "$TEMPLATE_DIR/style.css.tpl" "$CSS_FILE"
fi

# Create Storybook story
if [ $WITH_STORY -eq 1 ]; then
  render_template "$TEMPLATE_DIR/story.ts.tpl" "$STORY_FILE"
fi

chmod 644 "$COMP_FILE" || true
[ -f "$CSS_FILE" ] && chmod 644 "$CSS_FILE" || true
[ -f "$STORY_FILE" ] && chmod 644 "$STORY_FILE" || true
[ -f "$INDEX_FILE" ] && chmod 644 "$INDEX_FILE" || true

printf "Created component skeleton at %s\n" "$COMP_DIR"

# Print a short summary
echo "Files created:"
ls -1 "$COMP_DIR" || true

exit 0
