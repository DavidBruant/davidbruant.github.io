---
title: The name of a function
author: David Bruant
layout: post
permalink: /?p=36
categories:
  - Uncategorized
---
*Problem :* getting the name of a function for debugging purposes. The only thing available to do this is the function object.

### `f.name`

Very convenient and implemented in most browsers, the [name property][1] provides the name. The only problem of this method is that it is not standard. It is not a part of ECMAScript 3 or 5.

### Extracting from `f.toString()`

ECMAScript 3/5 `Function.prototype.toString()`:

> An implementation-dependent representation of the function is returned. This representation has the syntax of a *FunctionDeclaration*. Note in particular that the use and placement of white space, line terminators, and semicolons within the representation String is implementation-dependent.

The grammar rule for *FunctionDeclaration* is :  
`function Identifier ( FormalParameterListopt ) { FunctionBody }`

Pretty cool and standard. The following code returns the function name in any ECMAScript compliant environment :  
[sourcecode language="javascript" light="true"]  
function extractFunctionName(f){  
var s = Function.prototype.toString.call(f); // f.toString may be overridden 

var leftParenthesisIndex = s.indexOf(&#8216;(&#8216;);  
var afterFunctionIndex = s.indexOf("function") + "function".length;

return afterFunctionIndex < leftParenthesisIndex ?  
s.substring(afterFunctionIndex, leftParenthesisIndex).trim():  
"";  
}  
[/sourcecode]

### Bonus : the anonymous function

When asking to Firebug the following :  
[sourcecode language="javascript" light="true"]  
console.log( extractFunctionName( function(){} ) );  
[/sourcecode]  
The answer is &#8220;(an empty string)&#8221;. Hmm&#8230; Remember the *Identifier* earlier ?  
The definition of *Identifier* is *IdentifierName but not reserved word*. *IdentifierName* is either *IdentifierStart* or  
*IdentifierName IdentifierPart*. In any case, an *IdentifierName* begins with an *IdentifierStart* which is :

> IdentifierStart ::  
> UnicodeLetter  
> $  
> _  
> UnicodeEscapeSequence

To conclude, an *Identifier* cannot be empty.

I call this a standard bug! Luckily, the [TC-39 committee][2] is [fully aware][3] of it

 [1]: https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Function/name
 [2]: http://www.ecma-international.org/memento/TC39.htm
 [3]: https://mail.mozilla.org/pipermail/es5-discuss/2009-May/002532.html