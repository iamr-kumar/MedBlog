





```javascript
POST  \users\       ->signup


POST   \auth\      ->login


POST    \posts\add-post     ->Add post

GET    \users\get-tagged-post?verified      -> Tagged Post of doctor (only doctor)

GET     \posts\get-post?illness & verified   -> All Posts (no login req)

GET   \posts\:post   -> Specific Post(no login req)

PUT    \posts\:post\like  -> like post

PUT   \posts\:post\unlike  -> unlike post

POST   \posts\:post\comment  -> add comment

DELETE  \posts\:post\:comment  -> delete comment

PUT    \posts\:post\verify   -> verify post (only tagged doctor)

```