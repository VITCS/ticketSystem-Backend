const mongoose = require('mongoose');
const {userSchema} = require('./schema');
var userModelSchema = mongoose.Schema(userSchema);
const bcrypt = require('bcryptjs');

/*
*   Will return fullName of the user
*/
// userModelSchema.virtual('fullName').get(function () {
//     let fullname = '';
//     if(this.FName != '')
//         fullname = this.FName;
    
//     if(this.MName != '' && typeof this.MName != typeof undefined)
//     {
//         if(fullname != '')
//             fullname += ' '+ this.MName;
//         else
//             fullname = this.MName;
//     }

//     if(this.LName != '')
//     {
//         if(fullname != '')
//             fullname += ' '+ this.LName;
//         else
//             fullname = this.LName;
//     }

//     return fullname;
// });

/*
*   Will return UID of the user
*/
userModelSchema.virtual('UID').get(function () {
    let UID = '';
    if(this._id)
        UID = this._id.toString(); 

    return UID;
});

/*
*   encrypting the password before saving it into DB
*/
userModelSchema.pre('save', function (next) {
    let user = this;

    console.log('is Pwd modified', this.isModified('Pwd'))
    console.log(user);

    if(user.Pwd != '')
    {

        if (this.isModified('Pwd') || this.isNew) {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return next(err);
                }

                bcrypt.hash(user.Pwd, salt, (err, hash) => {
                    if (err) {
                        return next(err);
                    }

                    user.Pwd = hash;
                    next();
                });
            });
        } else {
            next();
        }
    }
    else
        next();
});


/*
*   Creating new user into Arca
*/
userModelSchema.statics.createUser = async function (userObject) {
    console.log(`User Object before inserting: ${JSON.stringify(userObject)}`);
    const userRecord = await this.create(userObject);
    console.log(`User Object after inserting: ${JSON.stringify(userRecord)}`);       
    return userRecord;
};

/*
*   Check user is already existed with the given email id
*   Will return TRUE if already exists, FALSE if not
*/
userModelSchema.statics.checkUserExistsByEmail = async function (email) {

    let result = await this.find({Email: email});
  
    if(result.length == 0)
    {
        return false;
    }
    else
    { 
        return result[0];
    }
};

/*
*   Check Verification code sent in email
*   Will return TRUE if already exists, FALSE if not
*/
userModelSchema.statics.verifyEmailCode = async function (UID, emailCode) {
    let query = {Verify: {EmailCode : emailCode},_id: UID};
    //console.log(`${JSON.stringify(query)}`)
    let result = await this.find({'Verify.0.EmailCode': emailCode, _id: UID});
    //console.log(result);
    if(result.length == 0)
    {
        return false;
    }
    else
    {
       // console.log(result);
        var res = await this.findByIdAndUpdate(UID, {Verify: [{Status: 1}]});//Updating the verification status
        console.log(res);
        return result;
    }
};

/*
*   Check Verification code sent in email
*   Will return TRUE if already exists, FALSE if not
*/
userModelSchema.statics.verifyChangeEmailCode = async function (UID, emailCode) {
    
    //console.log(`${JSON.stringify(query)}`)
    let result = await this.find({'ChangeEmail.EmailCode': emailCode, _id: UID});
    //console.log(result);
    if(result.length == 0)
    {
        return false;
    }
    else
    {
        var Email = result[0].ChangeEmail.Email;
       // console.log(result);
        var res = await this.findByIdAndUpdate(UID, {Email: Email, ChangeEmail: {Status: 1}});//Updating the verification status
        console.log(res);
        return result;
    }
};

/*
*   Login query using Email and Password
*   Will return User Object if already successful login, FALSE if not
*/
userModelSchema.statics.loginUser = async function (loginRequest) {

    const { Email, Pwd } = loginRequest;
    console.log('login')
    var returnUser = await this.find({Email:Email});
    console.log('returnUser '+returnUser)
    if(returnUser.length == 1)
    {
        if (returnUser) 
        {
            console.log(returnUser)
            const match = await bcrypt.compare(Pwd, returnUser[0].Pwd);
            if(match === true)
            {
                console.log(`login result: ${JSON.stringify(returnUser)}`);
                return returnUser[0];
            }
            else
                return false;

        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
};

userModelSchema.set('toObject', { getters: true });
userModelSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userModelSchema);