# igorsvolohovs-github-io

The personal portfolio site of Igors Volohovs, a software and embedded engineer.

## What is here

- `index.html` is the whole site, one page with its style and script inline:
  about, services, selected cases, skills, interests, education and a contact
  form. The form posts to Web3Forms.
- `assets/cases/` holds the photographs of the cases, and `assets/video/` the
  videos.
- `image.png` is the portrait on the first screen, which the page also names as
  its preview image.
- `contacts.vcf` is the contact card the page offers to download, and `vcf.jpg`
  the QR code for it.
- `.claude/launch.json` starts a local preview with `python3 -m http.server 8642`.

There is no build step. GitHub Pages serves the site from the GitHub copy of
this repository at <https://igorsvolohovs.github.io/>. Nothing pushes from this
Gitea copy to GitHub, so a change made here does not reach that address by
itself.

## Working on it

This repository ships no program. `.\recipe.ps1` is still its whole interface:
`.\recipe.ps1 test` runs pytest and ruff over `.claude`, and `.\recipe.ps1 info`
prints the metadata. The other verbs print `nothing to <verb>`. `CLAUDE.md`
holds the rules.

## License

MIT. See [LICENSE](LICENSE).

## Lab requirements

This repository complies with [revision 4.0.0](http://127.0.0.1:3000/igors-lab/software-requirements/src/tag/v4.0.0/BEST_REQUIREMENTS.md) of the lab requirements, except R-02 (#7), R-09 (#8), R-37 (#9), R-41 (#10), R-42 (#11).
