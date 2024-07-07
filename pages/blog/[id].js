import { useRouter } from 'next/router'
import Layout1 from '../components/Layout1/Layout1';

export default function Page(props) {
  const router = useRouter()
  return (
    <>
      <Layout1 title={props.templateId}>
        <div dangerouslySetInnerHTML={{ __html: props.posts }} />
      </Layout1>
    </>
  )
}
export async function getStaticProps({ params }) {
  const templateId = params.id;
  let posts = "Error";
  posts = await getCachedTemplate(templateId);
  return {
    props: {
      posts,
      templateId
    },
  }
}

export async function getCachedTemplate(templateId) {
  const endpointUrl = process.env.API_HOST + 'templates?filters[name][$eq]=' + templateId;
  let templateData = "No Data Available";
  await fetch(endpointUrl, { next: { revalidate: 3600 } }).then(async (response) => { if (response.status === 200) templateData = await response.json(); templateData = templateData.data[0].attributes.template; }).catch((error) => console.error("Error " + error));
  return templateData;
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '' } },
    ],
    fallback: true
  }
}