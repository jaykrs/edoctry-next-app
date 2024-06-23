import { useRouter } from 'next/router'

export default function Page(props) {
  const router = useRouter()

  return <div dangerouslySetInnerHTML={{ __html: props.posts }} />;
}
export async function getStaticProps({ params }) {
  const templateId = params.id;
  let posts = templateId !== '' ? await getCachedTemplate(templateId) : "Request param is missing";
  return {
    props: {
      posts,
    },
  }
}

export async function getCachedTemplate(templateId) {
  const endpointUrl = process.env.API_HOST + 'templates?filters[name][$eq]=' + templateId;
  let templateData = "No Data Available";
  await fetch(endpointUrl).then(async (response) => { if (response.status === 200) templateData = await response.json(); templateData = templateData.data[0].attributes.template; }).then((result) => console.log(result)).catch((error) => console.error(error));
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