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

