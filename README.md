# Fable Security Coding Challenge

This is my (Adlai Abdelrazaq) submission for fable security's fullstack role.

# Description of the code

The project is a preact app I bootstrapped with [create_tw](https://github.com/AndrejJurkin/create-tw). I chose (p)React because you guys use it, I'm comfortable with it, and to demonstrate that I make conscious decisions about application size while building. I chose Tailwind because it has wide adoption, makes styles easy to maintain, and it results in a lot less CSS for the developer.

The way that I set up the parent component, `/src/components/ReviewAndComment.js` is I had the "page" - `app.js` make the api call with axios, and then send the data to the child component. I used axios because I like the api more than fetch's and it has better browser support.

I added the function `processCommentData` to massage the data we get back from the server - I added an attribute `hideAvatar` to items where the same person sends multiple messages in a row. I didn't want the components that are rendering the data to have to be doing too much logic, so I did it up here. I think this is an okay solution but you have to remember to call `processCommentData` again when you update the comments in any way. If you don't you would end up with a bug where the same avatar is showed multiple times which the design seems to indicate isn't desired. I could write a function `updateComments` that calls `processCommentData` and `setComments` if this gets too annoying.

`ReviewAndComment.js` is pretty straightforward, it renders the `CommentItem`s. CommentItem makes use of components `Comment` and `Review` which I chose to include in the same file since no other components use them and all three components are quite small, so this makes it more readable. If another component needed to reuse it I would abstract it to its own component, like i did for `Avatar`.

`Avatar` was the most complex component - there are several different ways that `Avatar` can look, it can be an image, a colored circle, or transparent. There's even an opportunity to have added a fourth type of Avatar, one with text (for the CA icon). But instead I just used a service - `https://ui-avatars.com/api`, that generates this type of icon. 

`Avatar` also had a really interesting visual component of it - the vertical line that goes through the left hand side. Since when we render lists of objects, each one typically stacks and subsequent items in a list don't interact with each other visually. At first I thought that the best way to do it would be to add a css :after on each `CommentItem` but once I tried this for a second I realized the variability in height in the items would make this approach one that might be difficult to maintain. Imagine if we decide to do a sitewide change in the sizes of paddings, would we have to write this component again because the change in padding makes each element a little bit off? Especially with a design like this, since it's elegant, delicate. Having noticable imperfections destroys the effect of this component. This makes it especially important to find a solution that is simple and flexible.

I decided the simplest thing to do was to take the same solution, using an :after pseudo element, and applying it to the parent component, all of the comments. Then, the child components can have a white background around them to give the illusion of padding. This way there's much less calculation, and it's easy to support variable heights. This is an example of a component where css rules make it easier to manage than application logic. However if we decide to push this to production it may involve having to "defend" the component from evil business / requirements people who may want to complicate this component. 

If there are too many bells and whistles that are added to this, managing this design in css could get unwieldy fast. If this component receives new complicated requirements, I could see going back to my original solution  being able to accomodate more use cases, and maybe moving away from :after pseudo elements altogether in favor of svg for example. 

The `CreateComment` is pretty straightforward too. It is kind of functional, you can add comments, but it just adds it to `[comments]` in `app.js`, so if you refresh it resets. But the same logic around showing the vertical bar and hiding avatars works with it. Also you can't actually attach files or add `Review`s. I was confused about the "Write your Comment..." and "Add your feedback" both being there - so I made "add your feedback" a dropdown with accepted/rejected to lind of emulate how something like `Helmut Magomedov approved briefing content · 128 days ago` would be triggered by a user. I took a walk and came back and looked at this and realized "Write your Comment..." was probably supposed to be a header? But I thought it was funny that I interpreted it as a placeholder, so I kept it in. Had I been working on this with a designer I definitely would've hit up the designer to ask what was going on here. I also The paperclip button onclick /enter / space opens a local directory via targeting an invisible `<input type="file">`. Clicking on "Comment" uses prop drilling to contact the parent, which isn't too great but the components are so small and it's only two levels deep so I decided it wasn't a problem.

The `helpers` and `models` components are used throughout - they illustrate how I like to keep data consistent and the type of infrastructure + mechanisms that I like in my project that makes it easy for me to get my work done and write clean code.

# What I would do if I had more time

* I don't like prop drilling, maybe adding some sort of state management would be better. 
* Implement adding `Review`s with the "Add your feedback" dropdown
* Adding a database so that new comments stay
* Websockets
* Add a "draw a picture" button next to the paperclip that lets you draw a picture