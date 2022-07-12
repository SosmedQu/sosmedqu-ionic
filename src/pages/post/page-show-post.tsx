import { IonPage, IonHeader, IonToolbar, IonContent, IonLoading, IonTitle, useIonViewWillEnter, IonCard, IonCardHeader, IonCardContent, IonRefresher, IonRefresherContent, RefresherEventDetail } from "@ionic/react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { ActionSheet, ActionSheetPublic } from "../../components/Menu";
import { PostContent } from "../../components/post/micro/post-content";
import { PostHeader } from "../../components/post/micro/post-header"
import { ToolBarWithGoBack } from "../../components/element/toolbar";
import { getdataToken } from "../../interface/IdataToken";

const PageShowPost: React.FC = () => {
    // const api = new MyApi()
    const [actionSheet, setActionSheet] = useState(false);
    const [showLoading, setShowLoading] = useState(true);
    const history = useHistory();
    const dataToken = getdataToken();
    const location = useLocation();
    const post: any = location.state;
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
        setShowLoading(false)
    })
    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        console.log('Begin async operation');
        window.location.reload();
        event.detail.complete();
    }
    return (
        <IonPage>
            <IonHeader>
                <ToolBarWithGoBack backTo={() => history.replace("/profile", post)} title="Show Post" />
            </IonHeader>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
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
                {post &&
                    <IonCard>
                        {dataToken?.userId === post.User.id
                            ? (

                                <ActionSheet show={actionSheet} onDidDismiss={() => setActionSheet(false)} data={post} />
                            )
                            : <ActionSheetPublic show={actionSheet} onDidDismiss={() => setActionSheet(false)} idPost={post.id} />
                        }
                        <IonCardHeader>
                            <PostHeader
                                id={post.User.id}
                                image={post.User.image}
                                username={post.User.username}
                                privacy={post.privacy}
                                onClickMore={() => setActionSheet(true)}
                            />
                        </IonCardHeader>
                        <IonCardContent>
                            <PostContent
                                PostCategory={post.PostCategory}
                                PostFiles={post.PostFiles}
                                caption={post.caption}
                            />
                        </IonCardContent>
                    </IonCard>
                }
            </IonContent>
        </IonPage>
    )
}

export default PageShowPost;