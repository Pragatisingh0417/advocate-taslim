import slugify from "slugify";

blogSchema.pre("save", function (next) {
  if (this.isModified("heading")) {
    this.slug = slugify(this.heading, {
      lower: true,
      strict: true, // removes special characters
    });
  }
  next();
});

