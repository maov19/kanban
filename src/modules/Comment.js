class Comment {
  constructor() {
    this.appId = 'VASVN7B36M4wHn663o4j';
    this.baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
  }

  postComment(itemId, username, comment) {
    const url = `${this.baseURL}/apps/${this.appId}/comments`;

    const body = { item_id: itemId, username, comment };

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (response.ok) {
            resolve(response.status);
          } else {
            throw new Error(`Failed to create comment: ${response.status}`);
          }
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('Failed to create comment'));
        });
    });
  }

  getComments(itemId) {
    const url = `${this.baseURL}/apps/${this.appId}/comments?item_id=${itemId}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Failed to get comments: ${response.status}`);
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error(error);
          reject(new Error('Failed to get comments'));
        });
    });
  }

  displayComments(itemId) {
    const container = document.getElementById('commentContainer');
    this.getComments(itemId)
      .then((comments) => {
        if (comments.length > 0) {
          const list = document.createElement('ul');
          comments.forEach((comment) => {
            const commentLists = document.createElement('li');
            commentLists.innerHTML = `${comment.creation_date} ${comment.username}: ${comment.comment} `;
            list.appendChild(commentLists);
          });
          container.innerHTML = '';
          container.appendChild(list);
        } else {
          container.innerHTML = 'No comments yet.';
        }
      })
      .catch((error) => {
        console.error(error);
        container.innerHTML = 'Failed to load comments.';
      });
  }
}

export default Comment;
