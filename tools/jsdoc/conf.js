module.exports = {
  tags: {
    allowUnknownTags: false,
  },
  source: {
    include: ['src/'],
    exclude: [],
    includePattern: '.+\\.js(doc)?$',
    excludePattern: '(^|\\/|\\\\)_',
  },
  plugins: ['./tools/jsdoc/tags'],
  templates: {
    cleverLinks: true,
    default: {
      includeDate: false,
      outputSourceFiles: false,
    },
    sourceUrl: 'http://127.0.0.1:8080/src/{filename}',
    // sourceUrl: 'https://github.com/emloxe/glup-template/blob/{version}/src/{filename}',
  },
  opts: {
    destination: 'docs/',
    template: './tools/jsdoc/template',
    recurse: true,
  },
};
