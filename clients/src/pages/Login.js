import React from "react";
import { github, goople } from "../assets/index";
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../redux/mapshopSlice";

const Login = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  
githubProvider.addScope('read:user');
githubProvider.addScope('user:email');


  const goToGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      dispatch(addUser({
        _id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      }));
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }).catch((error) => {
      console.log(error);
    });
  };

  const goToGitHub = (e) => {
    e.preventDefault();
    signInWithPopup(auth, githubProvider).then((result) => {
      const user = result.user;
      dispatch(addUser({
        _id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      }));
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }).catch((error) => {
      console.log(error);
    });
  };

  const goOutToGoogle = () => {
    signOut(auth).then(() => {
      toast.success("Déconnexion réussie !");
      dispatch(removeUser());
    }).catch((error) => {
      console.log(error);
    });
  };

  const goOutToGitHub = () => {
    signOut(auth).then(() => {
      toast.success("Déconnexion réussie !");
      dispatch(removeUser());
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-10 py-20">
      <div className="flex justify-center items-center gap-10 w-full">
        <div className="border-gray-400 hover:border-blue-600 cursor-pointer duration-300 flex justify-center items-center text-base rounded-md gap-2 w-80 h-12 tracking-wide border-[1px]" onClick={goToGoogle}>
          <img src={goople} className="w-8" />
          <span className="text-sm text-gray-900">Se connecter avec Google</span>
        </div>
        <button className="bg-black text-white hover:bg-gray-800 duration-300 rounded-md text-base py-3 px-8 tracking-wide" onClick={goOutToGoogle}>Se Déconnecter</button>
      </div>

      <div className="flex justify-center items-center gap-10 w-full">
        <div className="border-gray-400 hover:border-blue-600 cursor-pointer duration-300 flex justify-center items-center text-base rounded-md gap-2 w-80 h-12 tracking-wide border-[1px]" onClick={goToGitHub}>
          <img src={github} className="w-8" />
          <span className="text-sm text-gray-900">Se connecter avec GitHub</span>
        </div>
        <button className="bg-black text-white hover:bg-gray-800 duration-300 rounded-md text-base py-3 px-8 tracking-wide" onClick={goOutToGitHub}>Se Déconnecter</button>
      </div>

      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
