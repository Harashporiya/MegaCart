// import { auth } from '@/auth'
import React from 'react'
// import Page from '../server/page';
import Header from "../(client)/Header/Header"
import './Home.css'
import Options from '../(client)/Options/Option';

const Home = async () => {
  // const session = await auth();
  // if (!session?.user) return null;

  return (
    <div>
      
       {/* <img
        src={session.user.image ?? '/default-avatar.png'}
        alt="User Avatar"
      /> */}
      {/* <Page/>  */}
      <Header />
      <Options/>
     
    </div>
  );
};

export default Home;
