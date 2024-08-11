import { useRouter } from 'next/router';
import Layout1 from '../components/Layout1/Layout1';

const BlogPost = ({ posts, templateId="" }) => {
  return (
    <>
      <Layout1 title={templateId}>
        <div dangerouslySetInnerHTML={{ __html: posts }} />
      </Layout1>
    </>
  );
};

export async function getStaticProps({ params }) {
  const templateId = params.id;
  let posts = "Error";

  try {
    posts = await getCachedTemplate(templateId);
  } catch (error) {
    console.error("Error fetching template:", error);
  }

  return {
    props: {
      posts,
      templateId
    },
    revalidate: 3600,
  };
}

async function getCachedTemplate(templateId) {
  const endpointUrl = `${process.env.API_HOST}templates?filters[name][$eq]=${templateId}`;
  let templateData = "";

  try {
    const response = await fetch(endpointUrl);
    if (response.status === 200) {
      const data = await response.json();
      templateData = data.data[0].attributes.template;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return templateData;
}

export async function getStaticPaths() {
  const allPosts = await fetchAllPosts();
  const paths = allPosts.map(post => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

async function fetchAllPosts() {
  const endpointUrl = `${process.env.API_HOST}templates`;
  let posts = [];

  try {
    const response = await fetch(endpointUrl);
    if (response.status === 200) {
      const data = await response.json();
      posts = data.data.map(post => ({ id: post.id }));
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return posts;
}

export default BlogPost;
