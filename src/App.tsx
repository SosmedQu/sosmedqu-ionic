import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import HomePage from './pages/page-home';
import PagePost from './pages/post/page-post';
import Profile from './pages/page-profile';
import Register from './pages/auth/page-register';
import LoginWithEmail from './pages/auth/page-login-email';
import Login from './pages/auth/page-main-login';
import CreatePassword from './pages/auth/page-create-password'
import VerifikasiEmail from './pages/auth/page-verify-email';
// import ShortVideo from './pages/page-short-video';
import { Chatting, ChattingDetail } from './components/chatting/chatting';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

// CSS SosmedQu
import './theme/app.css';
import { newspaperSharp, personSharp, logInSharp, bookSharp } from 'ionicons/icons';
import VerifyAccount from './components/verify-account';
import PageEbookQu from './pages/ebook/page-ebookqu';
import PageEbookDetail from './pages/ebook/page-ebook-detail';
import ProtectedRoute from './ProtectedRoute';
import UpgradeStudent from './pages/student/upgrade-student';
import ProfileView from './pages/student/page-view-profile';
import FollowerRanking from './pages/student/follower-ranking';
import PageShowPost from './pages/post/page-show-post';
import PageCreatePost from './pages/post/page-create-post';
import PageUpdatePost from './pages/post/page-update-post';
import { PageUpdateGeneral } from './pages/student/page-update-general';
import { getdataToken } from './interface/IdataToken';
import { PageCreateEbook } from './pages/ebook/page-create-ebook';
import { PageLesson } from './pages/lesson/page-lesson';
import PageEbooks from './pages/ebook/page-ebooks';
import { PageUpdateEbook } from './pages/ebook/page-update-ebook';
import PageSearchEbook from './pages/ebook/page-search-ebook';
import PageSearchPost from './pages/post/page-search-post';
import { PageCreateLesson } from './pages/lesson/page-create-lesson';


setupIonicReact();

const App: React.FC = () => {
  const token = getdataToken();
  // const locationHiddenTabs = ["/login", "/register", "/login-email", "creae", "/register/verify-account", "/register/create-password"];
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/login" render={() => {
              return token ? <Redirect to="/post" /> : <Login />
            }}>
            </Route>
            <Route exact path="/login-email">
              <LoginWithEmail />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/register/verify-email">
              <VerifikasiEmail />
            </Route>
            <Route exact path="/register/create-password">
              <CreatePassword />
            </Route>
            <Route exact path="/register/verify-account">
              <VerifyAccount />
            </Route>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <ProtectedRoute exact path="/chatting">
              <Chatting />
            </ProtectedRoute>
            <ProtectedRoute exact path="/chatting/detail">
              <ChattingDetail />
            </ProtectedRoute>
            <Route exact path="/post">
              <PagePost />
            </Route>
            <Route exact path="/show-post">
              <PageShowPost />
            </Route>
            <ProtectedRoute exact path="/add-post">
              <PageCreatePost />
            </ProtectedRoute>
            <ProtectedRoute exact path="/edite-post">
              <PageUpdatePost />
            </ProtectedRoute>
            {/* E-Book Start */}
            <Route exact path="/ebook">
              <PageEbookQu />
            </Route>
            <Route exact path="/ebooks">
              <PageEbooks />
            </Route>
            <Route exact path="/ebook/detail">
              <PageEbookDetail />
            </Route>
            <ProtectedRoute exact path="/ebook/create">
              <PageCreateEbook />
            </ProtectedRoute>
            <ProtectedRoute exact path="/ebook/update">
              <PageUpdateEbook />
            </ProtectedRoute>
            {/* E-Book End */}


            {/* Lesson */}
            <ProtectedRoute exact path="/lesson">
              <PageLesson />
            </ProtectedRoute>
            <ProtectedRoute exact path="/lesson/create">
              <PageCreateLesson />
            </ProtectedRoute>
            {/* End Lesson */}
            {/* <Route exact path="/short-video">
              <ShortVideo />
            </Route> */}
            <Route exact path="/search/post">
              <PageSearchPost />
            </Route>
            <Route exact path="/search/ebook">
              <PageSearchEbook />
            </Route>
            {/* Profile */}
            <ProtectedRoute exact path="/profile">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute exact path="/profile/view">
              <ProfileView />
            </ProtectedRoute>
            <ProtectedRoute exact path="/student/update">
              <PageUpdateGeneral />
            </ProtectedRoute>
            <ProtectedRoute exact path="/upgrade-student">
              <UpgradeStudent />
            </ProtectedRoute>
            {/* End Of Profile */}
            <Route exact path="/follower-ranking">
              <FollowerRanking />
            </Route>

            <Route exact path="/">
              <Redirect to="/post" />
            </Route>
            <Route exact path="">
              <Redirect to="/post" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" color={'primary'}
          >
            <IonTabButton tab="ebooks" href="/ebooks">
              <IonIcon icon={bookSharp} />
              <IonLabel>Ebooks</IonLabel>
            </IonTabButton>
            <IonTabButton tab="post" href="/post">
              <IonIcon icon={newspaperSharp} />
              <IonLabel>PostQu</IonLabel>
            </IonTabButton>
            {token
              ? (<IonTabButton tab="profile" href="/profile">
                <IonIcon icon={personSharp} />
                <IonLabel>profile</IonLabel>
              </IonTabButton>)
              :
              <IonTabButton tab="login" href="/login">
                <IonIcon icon={logInSharp} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}


export default App;
