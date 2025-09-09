# Changelog
## [0.3.1] - 9/9/2025
### Changes
- Fixed issue where type data required by the API was not included in the published package.
- Added missing server entity components.
- Added the missing `ClientRenderController` class.
- Fixed issue where `blocks.json` was not being processed correctly.
- Fixed issue where a script build error would cause `build --watch` to exit.
- Fixed issue where nested directories with only files ignored by the static watcher (i.e. the behavior_pack/scripts directory which is handled by the script watcher instead) would silently fail and prevent any subsequent directories from being processed.
---
## [0.3.0] - 9/3/2025
### Changes
- Fixed issue where moving/renaming/deleting a directory could cause the watcher to crash.
- Fixed issue where src `sound_definitions.json` contents were being written to `sounds.json` in dist.
- Fixed issue where the version message was identical between local and global installs. Now the update message is appropriate given the scope.
- Fixed issue where an invalid config file would not always print the appropriate error in `watch` mode.
- Added `netherite new item` which creates the files to add a new item to `src`.
- Added `netherite new armor` which creates the files to add a new armor set to `src`.
- Added `netherite new attachable` which creates the files to add a new skeletal attachable to `src`.
- Added `netherite new entity` which creates the files to add a new dummy entity to `src`.
---
## [0.2.5] - 8/25/2025
### Changes
- Fixed JSONC parsing invalidating strings like `"https://example.com"` which caused package importing to fail.
---
## [0.2.4] - 8/19/2025
### Changes
- Changed the subdirectory pattern from using `vanilla/` to represent the base directory. Now base files are treated as vanilla, and `PATH/` directories are sent into the `<Creator>/<Project>` subdirectory structure.
- Added support for publishing to GitHub automatically after using `netherite init` to create a project.
---
## [0.2.3] - 8/19/2025
### Changes
- Fixed issue where log messages generated while a spinner was active would be dropped instead of cached until the spinner completed.
- General logging improvements
- Fixed issue where JSON files with comments could break the build process.
- Fixed issue where `netherite build --watch` could fail when the resources it attempts to copy are busy (i.e. when pasting folders into a project).
---
## [0.2.2] - 7/11/2025
### Changes
- Fixed issue where `backticked` markdown strings where not included in the changelog when publishing Netherite packages.
---
## [0.2.1] - 7/11/2025
### Changes
- Added improved feedback to `netherite package publish`, which will now link to the actual pull request rather than the repo.
- Updated `netherite package create` and `netherite package publish` commands to provide changelog support.
- Update Netherite package frameworks to store versions in a `versions` subfolder rather than stacking versions in the root.
---
## [0.2.0] - 6/30/2025
### Changes
- Added improved feedback to `netherite package publish`, which will now link to the repo's URL after a successful publish.
- Added an `import` option to `netherite.package.json` files which allows an import map configuration when installed.
- Added schema support for `netherite.package.json` files.
- Added `changelog.md`.
---
