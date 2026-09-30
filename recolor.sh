#!/usr/bin/env bash
for f in "$@"; do
  if [[ "$f" == *cedula* ]]; then
    sed -i -E 's/(bg|border|text)-orange-(50|200|800)/\1-amber-\2/g' "$f"
  fi

  sed -i 's/bg-gradient-to-br from-orange-50 to-red-100/bg-slate-50/g' "$f"
  sed -i 's/bg-gradient-to-br from-blue-50 to-indigo-100/bg-slate-50/g' "$f"

  sed -i 's/\bbg-blue-800\b/bg-blue-700/g' "$f"
  sed -i 's/hover:bg-blue-700/hover:bg-blue-800/g' "$f"
  sed -i 's/\bbg-blue-600\b/bg-blue-700/g' "$f"
  sed -i 's/border-blue-600 border-t-transparent/border-blue-700 border-t-transparent/g' "$f"

  sed -i 's/hover:bg-orange-600/hover:bg-blue-800/g' "$f"
  sed -i 's/hover:border-orange-500/hover:border-blue-600/g' "$f"
  sed -i 's/\bbg-orange-500\b/bg-blue-700/g' "$f"
  sed -i 's/\bbg-orange-600\b/bg-blue-700/g' "$f"
  sed -i 's/text-orange-600/text-blue-700/g' "$f"
  sed -i 's/text-orange-500/text-blue-600/g' "$f"
  sed -i 's/border-orange-500/border-blue-700/g' "$f"
  sed -i 's/border-orange-600/border-blue-700/g' "$f"
  sed -i 's/-orange-/-blue-/g' "$f"

  sed -i 's/-indigo-/-blue-/g' "$f"
  sed -i 's/-gray-/-slate-/g' "$f"
  echo "Updated $f"
done
echo "Done. Review with: git diff"
