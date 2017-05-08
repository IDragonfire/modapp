# modapp
A webapp to make the the livf of moderators from faf easier (not simple).

# Modules

## Bans
* CRUD bans
  * game ban vs chat ban vs both
  * duration or permanent
  * bans should be never deleted, but disabled and stay as log in the db
  * bans can be seen by everyone

## Avatars
* CRUD avatars (avatars_list)
  * Avatar have a tooltip
  * Avatar have an icon (url)
  * If you delete the avatar all avatar assignments will be deleted
* Assign Avatars (avatars), CRUD one avatar to multiple people
  * Avatars stay forever or for for a certain duration
  * List of all avatar assignments

## Renaming

## Reports

# Development

1. Install node
2. Run `npm install`
3. Start dev server with `npm run dev`

# Resources

* JavaScript Documentation: http://devdocs.io/
* Webpack-Dev-Server Documentation: https://webpack.github.io/docs/webpack-dev-server.html 
* React Documentation: https://facebook.github.io/react/docs/hello-world.html 

I suggest to use [Visual Studio Code](https://facebook.github.io/react/docs/hello-world.html) for development with this plugins:
* ESLint
* Sass
