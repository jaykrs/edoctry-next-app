
export default function Page(props) {
    return <h1>{props.coursesSet1[0].attributes.course_title}</h1>
  }

export async function getServerSideProps() {
    let homePageData = "Emtpy Data";
    const coursesSet1 = await getCachedCoursesForHomepage('server');
    const coursesSet2 = await getCachedCoursesForHomepage('frontend');
    const coursesSet3 = await getCachedCoursesForHomepage('backend');
    return {
        props: {
          homePageData,
          coursesSet1,
          coursesSet2,
          coursesSet3
        },
}  
}  

export async function getCachedCoursesForHomepage(metadata) {
    const endpointUrl = process.env.API_HOST + 'courses?filters[metadata][$contains]=' + metadata;
    let coursesData = [];
    await fetch(endpointUrl,{ next: { revalidate: 3600 }}).then(async (response) => { if (response.status === 200) {coursesData = await response.json();  coursesData = coursesData.data; }}).catch((error) => console.error("Error "+error));
    return coursesData;
  };
