// lib/posts.js 

export async function getPostIdList() {
    return [{
      params: {
        id: '1'
      }
    }, {
      params: {
        id: '2'
      }
    }, {
      params: {
        id: '3'
      }
    }]
  }

  // lib/posts.js 

export async function getPostDetails(postId) {
    const dataSet = {
      '1': {
        title: 'Post 1',
        description: 'Lorem ipsum dolor sit amet...',
        date: 'Oct 10, 2022'
      },
      '2': {
        title: 'Post 2',
        description: 'Lorem ipsum dolor sit amet...',
        date: 'Oct 20, 2022'
      },
      '3': {
        title: 'Post 3',
        description: 'Lorem ipsum dolor sit amet...',
        date: 'Oct 30, 2022'
      }
    }
    return dataSet[postId]
  }