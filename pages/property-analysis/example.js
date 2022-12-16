import { ApplicationLayout } from "../../components/applicationLayout";

const Example = () => {

    return (
        <>
            <div>
                x
            </div>
        </>
    );

};

Example.getLayout = (page) => (
    <ApplicationLayout>
        {page}
    </ApplicationLayout>
);

export default Example;