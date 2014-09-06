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


var MAIN_DIRECTORY = resolve(process.cwd(), args[0]);
console.log('MAIN_DIRECTORY', MAIN_DIRECTORY);
var SOURCES_DIRECTORY = join(MAIN_DIRECTORY, '_sources');

var BASE_HTML_PATH = join(SOURCES_DIRECTORY, 'base.html');
var ARTICLES_DIRECTORY = join(SOURCES_DIRECTORY, 'articles');
var ARTICLES_METADATA_PATH = join(ARTICLES_DIRECTORY, 'metadata.json');

var baseHTMLP = new Promise(function(resolve, reject){
    fs.readFile(BASE_HTML_PATH, function(err, baseHTMLBuffer){
        if(err) reject(err);
        else resolve(baseHTMLBuffer.toString());
    });
});

var articlesMetadataP = new Promise(function(resolve, reject){
    fs.readFile(ARTICLES_METADATA_PATH, function(err, metadataBuffer){
        if(err) reject(err);
        else resolve(JSON.parse(metadataBuffer.toString()));
    });
});

/*
    TODO: 
    3. Check if the .md file already has an h1. If it does, report conflict and stop for this file
*/

fs.readdir(ARTICLES_DIRECTORY, function(err, files){
    // TODO use robust ~fs.extension function instead of endsWith
    files = files.filter(function(f){ return path.extname(f) === '.md'; })
    
    articlesMetadataP = articlesMetadataP.then(function(articlesMetadata){
        var metadataFiles = Object.keys(articlesMetadata);
        
        /*var metadataFilesNotFound = metadataFiles.filter(function(f){
            return files.indexOf(f) === -1;
        });
        
        if(metadataFilesNotFound.length >= 1)
            throw new Error('metadataFilesNotFound\n'+metadataFilesNotFound.join('\n'));
        
        var existingFilesWithoutMetadata = files.filter(function(f){
            return metadataFiles.indexOf(f) === -1;
        });
        
        if(existingFilesWithoutMetadata.length >= 1)
            throw new Error('existingFilesWithoutMetadata\n'+existingFilesWithoutMetadata.join('\n'));
        */
        return articlesMetadata;
            
    }).catch(function(err){
        console.error('Mismatch between metadata and source files', err);
    });
    
    articlesMetadataP.then(function(articlesMetadata){
        files.forEach(function(f){
            var articleMetadata = articlesMetadata[f];
            
            var path = join(ARTICLES_DIRECTORY, f);

            fs.readFile(path, function(err, fileContent){
                if(err) throw err;

                var html = marked(fileContent.toString());

                //console.log(f, html.length, typeof html);

                // always recreate a fresh doc from HTML string for baseHTML
                Promise.all([makeDocument(html), baseHTMLP.then(makeDocument)])
                    .then(function(results){
                        var articleDoc = results[0], baseDoc = results[1];

                        var baseDocArticle = baseDoc.querySelector('article');

                        //console.log('baseDocArticle', baseDocArticle.outerHTML);
                        baseDocArticle.innerHTML = articleDoc.body.innerHTML;

                /*
                    See if there is an <h1> in articleDoc.body. If it differs from articleMetadata.title, throw
                    Feed the head > title with the title and add an h1 if there isn't one
                */

                        var path = join(MAIN_DIRECTORY, f.replace('.md', '.html'))

                        fs.writeFile(path, baseDoc.innerHTML, function(err){ if(err) throw err; });
                    }).catch(function(err){ console.error(err) } );

            });
        });
    })
    
});
        