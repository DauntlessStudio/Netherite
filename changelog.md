# Changelog
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