import { IonPage, IonHeader, IonToolbar, IonContent, IonLoading, IonTitle, useIonViewWillEnter, IonCard, IonCardHeader } from "@ionic/react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { ActionSheet } from "../../components/Menu";
import { PostHeader } from "../../components/post/micro/post-header"
import ToolBarWithGoBack from "../../components/Utils/element/toolbar";

const PageShowPost: React.FC = () => {
    // const api = new MyApi()
    const [actionSheet, setActionSheet] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();
    const post: any = location.state;
    console.log(post);
    if (!post) {
        history.replace("/post");
    }
    // useEffect(() => {
    //     api.getOnePost(id).then((response) => {
    //         console.log(response.data)
    //         setData(response.data.post);
    //     }, err => {
    //         console.log(err);
    //     }).finally(() => {
    //         setShowLoading(false)
    //     })
    // }, [])
    useIonViewWillEnter(() => {
        console.log(post);
        setShowLoading(false)
    })
    return (
        <IonPage>
            <IonHeader>
                <ToolBarWithGoBack backTo={() => history.replace("/profile", post)} title="Show Post" />
            </IonHeader>
            <IonContent>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}
                />
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Show Post</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <ActionSheet show={actionSheet} onDidDismiss={() => setActionSheet(false)} data={post} />
                    <IonCardHeader>
                        <PostHeader
                            image={post.User.image}
                            username={post.User.username}
                            privacy={post.privacy}
                            onClickMore={() => setActionSheet(true)}
                        />
                    </IonCardHeader>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default PageShowPost;