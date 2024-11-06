import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platformId: 'com.jsm.aora',
    projectId: '66696cbb0008c5dedd70',
    databaseId: '66696d41001e6dc3f677',
    userCollectionId: '66696d480010019238a5',
    videoCollectionId: '66696d50000b6f61d195',
    storageId: '6669705d001f75b38435'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platformId)
    ;


const account = new Account(client);
const avatar = new Avatars(client)
const databases = new Databases(client)

export const createUser = async ({ username, password, email }) => {
    try {
        console.log('Creating user')
        const newAccount = await account.create(ID.unique(), email, password, username)

        if (!newAccount) throw Error


        const avatarUrl = avatar.getInitials(username)

        // here we are creating a session for the signed up user
        await signIn(email, password)

        console.log('Adding user to database')
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            password,
            avatar: avatarUrl
        }
        )


        console.log('User added')
        console.log(newUser)

    } catch (error) {
        console.log('Error while creating and adding user to database : ', error);

    }
}

export async function signIn(email, password) {
    console.log('Inside signIn')
    try {
        const session = await account.createEmailPasswordSession(email, password)
        console.log('Session created', session)
    } catch (error) {
        throw new Error(error)
    }
}


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        // console.log('current account ',currentAccount.$id)

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id.toString())]
        )

        // console.log('current user', currentUser)
        return currentUser.documents[0]

    } catch (error) {

    }
}


export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}


export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('creator', userId)]
        )

        return posts.documents
    } catch (error) {
        console.log(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )

        return posts.documents;
    } catch (error) {
        console.log(error)
    }
}

export const searchPosts = async (query) => {
    try {
        console.log('inside search post')
        console.log('query is ', query)
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
        );

        console.log(posts.documents)
        if (!posts) throw new Error("Something went wrong!")

        return posts.documents;
    } catch (error) {
        console.log(error)
    }
}

export const uploadFile = async(file, type) => {
    if(!file) return;

    const {mimeType, ...rest} = file
    const asset = { type: mimeType , ...rest }

    try {
        const uploadFile = await storage.createFile(
            config.storageId,
            ID.unique,
            asset
        )

        const fileUrl = await getFilePreview(uploadFile.$id, type)

        return fileUrl
    } catch (error) {
        console.log('Error while uploading file to storage!!!')
    }
}

export const getFilePreview = async(fileId,type) => {
    let fileUrl;

    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(config.storageId, fileId)
        } else if(type === 'image') {
            fileUrl = storage.getFilePreview(config.storageId,
                fileId,
                2000,2000,'top',100
            )
        } else {
            throw new Error("Invalid file type")
        }

        if(!fileUrl) throw Error;

        return fileUrl;
        
    } catch (error) {
        
    }
}

export const createVideoPost = async (form) => {
    const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail,'image'),
        uploadFile(form.video, 'video')
    ])

    const newPost = await databases.createDocument(
        config.databaseId,
        config.videoCollectionId,
        ID.unique,
        {
            title : form.title,
            prompt : form.prompt,
            video: videoUrl,
            creator : form.userId,
            thumbnailUrl : thumbnailUrl
        }
    )
}