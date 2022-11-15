import app from "./firebaseConfiguration";
import { getDatabase, ref, push, set, onValue , onChildAdded } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged ,signOut } from "firebase/auth";
const auth = getAuth();
const db = getDatabase();

const signUpUser = (obj, nodeName) => {
  let { email, password } = obj;
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        obj.rollNumber = user.uid;
        set(ref(db, `${nodeName}/${user.uid}`), obj)
          .then(() => {
            resolve("user created successfully and send to database")
          })
          .catch((error) => {
            reject(error)
          })
      })
      .catch((error) => {
        reject(error)
        // ..
      });
  })
}
const loginUser = (obj, nodeName) => {
  let { email, password } = obj;
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const starCountRef = ref(db, `${nodeName}/${user.uid}`);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.exists();
          if (data) {
            resolve(snapshot.val())
          } else {
            reject(
              "Data Not Found"
            )
          }
        });
      })
      .catch((error) => {
        reject(error)
      });
  })

}
let checkUsers = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(uid)
      } else {
        reject("No user Login")
      }
    });
  })
}
let sendData = (data, nodeName) => {
  return new Promise((resolve, reject) => {
    const postListRef = ref(db, `${nodeName}/`);
    const newPostRef = push(postListRef);
    set(newPostRef, data)
      .then(() => {
        resolve("Data Sent Successfully")
      })
      .catch((error) => {
        reject(error)
      })
  })
}
let getData = (nodeName) => {
  return new Promise((resolve, reject) => {
    const starCountRef = ref(db, `${nodeName}/`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.exists();
      if (data) {
        resolve(snapshot.val())
      } else {
        reject("Data Not Found")
      }
    })
  })
    
  }
  let getChildData = (nodeName) => {
    return new Promise((resolve, reject) => {
      const starCountRef = ref(db, `${nodeName}/`);
      onChildAdded(starCountRef, (snapshot) => {
        const data = snapshot.exists();
        if (data) {
          resolve(snapshot.val())
        } else {
          reject("Data Not Found")
        }
      })
    })
      
    }
let sendDatawithId = (data, nodeName , uid) => {
    return new Promise((resolve, reject) => {
      const postListRef = ref(db, `${nodeName}/${uid}/`);
      const newPostRef = push(postListRef);
      set(newPostRef, data)
        .then(() => {
          resolve("Data Sent Successfully")
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
let getDatawithId = (nodeName , uid)=>{
    return new Promise((resolve, reject) => {
      const starCountRef = ref(db, `${nodeName}/${uid}/`);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.exists();
        if (data) {
          resolve(snapshot.val())
        } else {
          reject(
            "Data Not Found"
          )
        }
      })
    })
}
let signOutUser = ()=>{
  return new Promise((resolve, reject) => {
    signOut(auth).then(() => {
       resolve(auth)
    }).catch((error) => {
       reject(error)
    });
  })

}
export { sendData, loginUser, signUpUser, checkUsers, getData ,getDatawithId,sendDatawithId , signOutUser, getChildData}