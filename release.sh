#!/bin/sh

set -e

yarn version --patch
git push origin master
git push origin --tags
