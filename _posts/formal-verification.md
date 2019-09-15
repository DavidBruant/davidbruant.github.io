I am extremely excited about formal verification coming to Rust
I think it changes the way we can make software correct

https://blog.merigoux.fr/en/2019/04/16/verifying-rust.html

Currently, in most real-life code, "correct" is an approximation that we construct via various means :
- Linters, static type checkers and automated tests are specialized tools that tell us each "the program does not contain the type of bugs i can detect"

- Code review is exactly the same thing, but with humans saying their own versions

This is all very time-consuming

Formal verification is a different approach :
you say what you want upfront in a specification and then the checker makes sure the code does what is described in the specification

That's it
No need for automated tests, fixtures, set up code, dedicated hardware, etc.

Also, if we have a formal spec different research work suggests, it may be possible to construct a working program automatically based on the specification :

https://thestrangeloop.com/2018/type-driven-program-synthesis.html

Maybe the program will be slow...
Oh well, let's optimize the performance-critical portions as we do today

I'm interested in all this coming to Rust, because there is little hope this will ever come to the web directly via JavaScript
However, Rust can access the web 