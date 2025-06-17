# TODO

- [ ] Rearrange file output to have home/index as first page
- [ ] Replace hardcoded merchant info to variables like {MERCHANT_RELEVANT_DETAILS}
- [ ] Inspect ASCII characters
- [x] Target bg-images `./assets` to  `{{CLOUDFRONT_URL}}`
- [x] Auto add {{CLOUDFRONT_URL}} to image src
- [x] Replace instances of `.png | .jpeg | .jpg` to `.webp`
- [x] Take a folder as an argument
<!-- - [] Provide multiple html files and make the result json commit-ready to S3 quickly -->
- [x] Skip navbar and footer with a `--no-header` flag/option
- [x] Set template visibility with a `--public=` flag/option, i.e, `--public=false`
- [x] Set template category with a `--category=` flag/option, i.e, `--category=ecommerce`
