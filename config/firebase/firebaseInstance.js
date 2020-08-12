// import auth from '@react-native-firebase/auth';

import app from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default class Firebase {
  constructor() {
    this.db = database();
    this.auth = auth();
    this.role = null;
  }

  doRemoveItem = async (origin) => {
    try {
      this.db.ref(`/userDevice/${origin}`).remove();
    } catch (error) {}
  };

  doStopCheckuserRole = () => {
    let email =
      this.auth.currentUser == null ? 'null' : this.auth.currentUser.email;

    let myEmail = email.replace('.', '');

    const myRole = this.db
      .ref(`/user/${myEmail}/role`)
      .on('value', (snapshot) => {
        res(snapshot.val());
      });

    this.db.ref(`/user/${myEmail}/role`).off('value', myRole);
  };

  doCheckuserRole = () => {
    let email =
      this.auth.currentUser == null ? 'null' : this.auth.currentUser.email;

    let myEmail = email.replace('.', '');
    // const myEmail = email;
    const myRole = new Promise((res, rej) => {
      this.db
        .ref(`/user/${myEmail}/role`)
        .once('value')
        .then((snapshot) => {
          res(snapshot.val());
        })
        .catch((err) => rej(err));

      // this.db.ref(`/user/${myEmail}/role`).on('value', (snapshot) => {
      //   res(snapshot.val());
      // });
    });

    return myRole;
  };

  doCheckEmailRole = (email) => {
    let myEmail = email.replace('.', '');

    return new Promise((res, rej) => {
      this.db
        .ref(`/user/${myEmail}/role`)
        .once('value')
        .then((data) => res(data.val()))
        .catch((err) => rej(err));
    });
  };

  RegisterUserAdmin = async (username = '', password, maRole) => {
    let myEmail = username.replace('.', '');
    try {
      await this.auth.createUserWithEmailAndPassword(username, password);
      await this.db.ref(`/user`).child(`/${myEmail}`).set({role: maRole});
      return 'berhasil';
    } catch (error) {
      return error;
    }
  };

  RegisterUserOrdinary = async (
    username = '',
    password,
    maRole,
    RFID,
    name,
  ) => {
    let myEmail = username.replace('.', '');

    //!!!
    try {
      const jumlahChild = await this.db.ref('/ID_RFID').once('value');

      await this.auth.createUserWithEmailAndPassword(username, password);
      await this.db
        .ref('/ID_RFID')
        .child(`user${jumlahChild.numChildren() + 1}`)
        .set(RFID);

      await this.db
        .ref(`/user`)
        .child(`/${myEmail}`)
        .set({
          role: maRole,
          RFID_code: `user${jumlahChild.numChildren()}`,
          name,
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  loginUserAdmin = async (username = '', password) => {
    return await new Promise(async (res, rej) => {
      const maRole = await this.doCheckEmailRole(username);

      return this.auth
        .signInWithEmailAndPassword(username, password)
        .then(() => res(maRole))
        .catch((err) => rej(err));
    });
  };

  logOutUserAdmin = () => {
    this.auth.signOut();
  };

  checkstateuser = () => {
    return this.auth.currentUser;
  };

  //! ///////////////////////////////////////////////////////
  //! //////////////////////////////
  //?  KHUSUS USER
  //! //////////////////////////////
  //! ///////////////////////////////////////////////////////

  getUserCupRFID = async () => {
    try {
      const email = await this.auth.currentUser.email;
      const emailThis = email.replace('.', '');
      const getUserCode = await this.db
        .ref(`/user/${emailThis}/RFID_code`)
        .once('value');

      const getUserRfid = await this.db
        .ref(`/ID_RFID/${getUserCode.val()}`)
        .once('value');

      return getUserRfid.val();
    } catch (error) {
      console.error(error);
    }
  };

  doRequestWater = async (quant, type) => {
    try {
      const cupRFID = await this.getUserCupRFID();

      await this.db.ref(`/userCup/${cupRFID}`).child('/waterReq').set(quant);
      await this.db.ref(`/userCup/${cupRFID}`).child('/waterType').set(type);

      await console.log('sukses');
    } catch (error) {
      console.error(error);
    }
  };
}
