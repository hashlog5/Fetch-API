// fetch('https://unsplash.it/600/400')
//   .then((res) => res.blob())
//   .then((blob) => {
//     let img = document.createElement('img');
//     img.src = URL.createObjectURL(blob);
//     document.querySelector('body').appendChild(img);
//   });

const PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/posts';
const IMG_URL = 'https://unsplash.it/300/200';

const postSection = document.querySelector('#posts');
const postTemplate = document.querySelector('#post-template');

// GET POSTS
const getData = async () => {
  const postStream = await fetch(PLACEHOLDER_URL);
  const posts = await postStream.json();

  let i = 0;
  posts.forEach((post) => {
    i++;
    if (i < 10) {
      fetch(IMG_URL)
        .then((res) => res.blob())
        .then((blob) => {
          const newPost = document.importNode(postTemplate.content, true);
          const postTitle = newPost.querySelector('.post__title');
          const postBody = newPost.querySelector('.post__body');
          const postImg = newPost.querySelector('.post__img');

          postTitle.innerText = post.title;
          postBody.innerText = post.body;
          postImg.src = URL.createObjectURL(blob);

          postSection.appendChild(newPost);
        })
        .catch((err) => console.log(err));
    }
  });
};
getData().catch((err) => console.log(err));

// CREATE POSTS
const myPost = {
  title: 'my post title',
  body: 'my post paragraph',
  userId: 1,
};

const createNewPost = (post) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(post),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  return fetch(PLACEHOLDER_URL, options)
    .then((res) => res.json())
    .then((posts) => console.log(posts))
    .catch((err) => console.log(err));
};
createNewPost(myPost);
