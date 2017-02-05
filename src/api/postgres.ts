
import express = require('express')
import { Post } from '../types'
import Promise = require('bluebird')
import {} from 'lodash'

const options = {
  // Initialization Options
  promiseLib: Promise
};

const pgp = require('pg-promise')(options)
const postgresLocation = process.env.DATABASE_URL || 'postgres://localhost:5432'
const connectionString = `${postgresLocation}/posts`
const db = pgp(connectionString)


export function getAllPosts(req: express.Request, res: express.Response): Promise<null> {
  return db.many('Select * FROM post')
    .then((posts: Post[]) => res.status(200).send(posts))
}

export function getOnePost(req: express.Request, res: express.Response): Promise<null> {
  const postID: Number = parseInt(req.params.id);
  return db.one('SELECT * FROM post WHERE id = $1', postID)
    .then((post: Post) => res.status(200).send(post))
    .catch((err: Error) => {
      res.status(404).send(`post with ${postID} was not found`)
    })
}

export function createNewPost(req: express.Request, res: express.Response): Promise<null> {
  const newPost = { ...req.body, count: 0 }
  return db.one(`INSERT INTO post(eventName, obamaLink, trumpLink, count)
  values(\${eventName}, \${obamaLink}, \${trumpLink}, \${count})
  RETURNING id`,
    newPost)
    .then(({ id }: any) => res.json({ id }))
    .catch((err: Error) => console.log(err))
}

export function deletePostById(req: express.Request, res: express.Response): Promise<null> {
  const idToDelete: Number = parseInt(req.params.id);
  return db.none('DELETE FROM post where id = $1', idToDelete).
  then(() => res.sendStatus(200))
}