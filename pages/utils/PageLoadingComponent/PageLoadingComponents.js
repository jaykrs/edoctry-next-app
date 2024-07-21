

const PageLoadingComponents = (props) => {
    const {loading=false} = props;

    return (
        <div style={{ display: loading ? 'block' : 'none' }}>
            <div className={"overlay"}></div>
            <div className={"spinner_wrapper"}>
                <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span class="sr-only"></span>
                </div>
            </div>
        </div>
    )
}
export default PageLoadingComponents;