#!/usr/bin/env bash

OSTIS_FOLDER=$1
OSTIS_FOLDER=${OSTIS_FOLDER:-$OSTIS_FOLDER_GLOBAL}
OSTIS_FOLDER=${OSTIS_FOLDER:-".."}
echo "ostis in folder: $OSTIS_FOLDER"

cp -rv ./kb/* $OSTIS_FOLDER/kb/

rm $OSTIS_FOLDER/sc-web/client/static/components/js/agents-registry.js
ln -v -s $(pwd)/dist/app.bundle.js $OSTIS_FOLDER/sc-web/client/static/components/js/agents-registry.js

cat <<EOT >> $OSTIS_FOLDER/sc-web/client/templates/components.html

<script type="text/javascript" charset="utf-8" src="/static/components/js/agents-registry.js"></script>

EOT

