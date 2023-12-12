class ProfileService {
    constructor(firebase, cloudStorage) {
        this._firebase = firebase;
        this._cloudStorage = cloudStorage;
    }

    createProfile = async (req, res) => {
        const uid = await this._firebase.getUid();
        const { name, email, age, sex } = req.body;
        const profile = {
            name,
            email,
            age,
            sex,
            uid
        };
        if (req.file) {
            const photoUrl = await this._firebase.uploadPhoto(req.file, 'profile_photo');
            profile.profilePictureUrl = photoUrl;
        }
        await this._firebase.createUser(profile);
        return profile;
    }

    getProfile = async (req, res) => {
        const uid = await this._firebase.getUid();
        return await this._firebase.getUser(uid);
    }
}

module.exports = ProfileService;