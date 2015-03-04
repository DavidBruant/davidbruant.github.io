"use strict";

var fs = require("fs");
var path = require('path');
var resolve = path.resolve;
var join = path.join;

var Promise = require('es6-promise').Promise;
var jsdom = require('jsdom');
var marked = require('marked');


function makeDocument(htmlFragment){
    return new Promise(function(resolve, reject){
        jsdom.env(htmlFragment, function(err, window){
            if(err) reject(err);
            else resolve(window.document);
        });
    })
}

// args
var args = process.argv.slice(2);

// TODO : print out the options
if(!args[0])
    throw new Error('Need a path to a directory where a blog is to be built as argument');

var blogTitle = path.basename(args[0]);
console.log('Generating blog', blogTitle);


var MAIN_DIRECTORY = resolve(process.cwd(), args[0]);
console.log('MAIN_DIRECTORY', MAIN_DIRECTORY);
var SOURCES_DIRECTORY = join(MAIN_DIRECTORY, '_sources');

var BASE_HTML_PATH = join(SOURCES_DIRECTORY, 'base.html');
var DETAILS_HTML_PATH = join(SOURCES_DIRECTORY, 'details.html');
var ARTICLES_DIRECTORY = join(SOURCES_DIRECTORY, 'articles');

var ARTICLES_METADATA_PATH = join(SOURCES_DIRECTORY, 'metadata.json');

var GENERATOR_DATA_ATTRIBUTE_PREFIX = 'data-generator-';


var baseHTMLP = new Promise(function(resolve, reject){
    fs.readFile(BASE_HTML_PATH, function(err, baseHTMLBuffer){
        if(err) reject(err);
        else resolve(baseHTMLBuffer.toString());
    });
});

var detailsHTMLP = new Promise(function(resolve, reject){
    fs.readFile(DETAILS_HTML_PATH, function(err, buffer){
        if(err) reject(err);
        else resolve(buffer.toString());
    });
});

var articlesMetadataP = new Promise(function(resolve, reject){
    fs.readFile(ARTICLES_METADATA_PATH, function(err, metadataBuffer){
        if(err) reject(err);
        else resolve(JSON.parse(metadataBuffer.toString()));
    });
});




var metadataTemplate = {
    "title": "TODO",
    "writing date": "YYYY-MM-DD",
    "meta": {
        "description": "TODO"
    },
    "data": {}
};

function makeMetadataEntries(keys){
    return JSON.stringify(keys.reduce(function(acc, k){
        acc[k] = metadataTemplate;
        return acc;
    }, {}), null, 4)
}


fs.readdir(ARTICLES_DIRECTORY, function(err, files){
    // TODO use robust ~fs.extension function instead of endsWith
    files = files.filter(function(f){ return path.extname(f) === '.md'; })
    
    articlesMetadataP = articlesMetadataP.then(function(articlesMetadata){
        var metadataFiles = Object.keys(articlesMetadata);
        
        var metadataFilesNotFound = metadataFiles.filter(function(f){
            return files.indexOf(f) === -1;
        });
        
        if(metadataFilesNotFound.length >= 1)
            throw new Error('metadataFilesNotFound\n'+metadataFilesNotFound.join('\n'));
        
        var existingFilesWithoutMetadata = files.filter(function(f){
            return metadataFiles.indexOf(f) === -1;
        });
        
        if(existingFilesWithoutMetadata.length >= 1)
            console.warn('existingFilesWithoutMetadata\n'+existingFilesWithoutMetadata.join('\n')+
                           '\n\nHere is some help:\n'+makeMetadataEntries(existingFilesWithoutMetadata));
        
        return articlesMetadata;
            
    }).catch(function(err){
        console.error('Mismatch between metadata and source files', err);
        throw err;
    });
    
    articlesMetadataP.then(function(articlesMetadata){
        files.forEach(function(f){
            var articleMetadata = articlesMetadata[f];
            
            var path = join(ARTICLES_DIRECTORY, f);

            fs.readFile(path, function(err, fileContent){
                if(err) throw err;

                var html = marked(fileContent.toString());

                // always recreate a fresh doc from HTML string for baseHTML
                Promise.all([makeDocument(html), baseHTMLP.then(makeDocument), detailsHTMLP.then(makeDocument)])
                    .then(function(results){
                        var articleDoc = results[0],
                            finalDocument = results[1],
                            detailsDoc = results[2];

                        var finalDocumentArticle = finalDocument.querySelector('article');
                        
                        // Add article body to document
                        finalDocumentArticle.innerHTML = articleDoc.body.innerHTML;
                        
                        var finalArticleTitle;  
                        var metadataTitle = articleMetadata.title;
                        var h1 = finalDocumentArticle.querySelector('h1');
                        
                        if(h1 === null && !metadataTitle)
                            throw new Error('No <h1> in article nor any title in metadata for '+f);
                        
                        if(h1 && metadataTitle && h1.textContent !== metadataTitle)
                            throw new Error('Title mismatch for '+f+'\n'+h1.textContent+'\n'+metadataTitle);
                        
                        if(metadataTitle === 'TODO')
                            console.warn('For article', f, 'metadata.title is', 'TODO');
                        
                        finalArticleTitle = h1 !== null ? h1.textContent : metadataTitle;
                        
                        finalDocument.title = finalArticleTitle + ' - ' + blogTitle + ' blog';
                        
                        // Add h1 if missing
                        if(!h1){
                            h1 = finalDocument.createElement('h1');
                            h1.textContent = finalArticleTitle;
                            
                            finalDocumentArticle.insertBefore(h1, finalDocumentArticle.firstChild);
                        }
                        
                        // Add details
                        finalDocumentArticle.innerHTML += detailsDoc.body.innerHTML;
                        
                        
                        // Process <meta>s
                        var metaCharset = finalDocument.querySelector('head meta[charset]');
                        if(!metaCharset)
                            throw new Error('You really should add <meta charset="utf-8"> right after the opening <head>')
                            
                        if(!articleMetadata.meta)
                            articleMetadata.meta = {};
                        
                        Object.keys(articleMetadata.meta).forEach(function(k){
                            var v = articleMetadata.meta[k];
                            if(k === 'description' && v === 'TODO')
                                console.warn(f, 'meta description TODO')
                            
                            var meta = finalDocument.createElement('meta');
                            meta.setAttribute('name', k);
                            meta.setAttribute('content', v);
                            
                            // should be insertAfter
                            finalDocument.head.insertBefore(meta, metaCharset.nextSibling);
                        });
                        
                        // Process data
                        if(!articleMetadata.data)
                            articleMetadata.data = {};
                        
                        if(articleMetadata.data['writing-date'])
                            console.warn(f, "There is already a value for data['writing-date']")
                        
                        articleMetadata.data['writing-date'] = articleMetadata['writing-date'];
                        
                        Object.keys(articleMetadata.data).forEach(function(k){
                            var v = articleMetadata.data[k];
                            var dataAttribute = GENERATOR_DATA_ATTRIBUTE_PREFIX + k;
                            var elems = finalDocument.querySelectorAll('['+dataAttribute+']');
                            if(elems.length === 0)
                                console.warn(f, "no element with attribute", dataAttribute);

                            [].forEach.call(elems, function(e){
                                e.textContent = v;
                                e.removeAttribute(dataAttribute); // cleanup attribute so it doesn't appear client-side
                            });
                        });
                        
                        // find a way to warn about the fact that some GENERATOR_DATA_ATTRIBUTE_PREFIX attributes are not filled if any
                        

                        var path = join(MAIN_DIRECTORY, f.replace('.md', '.html'))

                        fs.writeFile(path, finalDocument.innerHTML, function(err){ if(err) throw err; });
                    })
                    .catch(function(err){ console.error(err) } );

            });
        });
    })
    
});
        