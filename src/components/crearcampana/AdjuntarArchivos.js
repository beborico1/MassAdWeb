import React, { useCallback, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../../helpers/firebase';

const AdjuntarArchivos = ({ adjuntos, setAdjuntos }) => {
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const onDrop = useCallback((acceptedFiles) => {
        setUploading(true);
        setTransferred(0);
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result;
                const blob = new Blob([binaryStr], {type: file.type});
                uploadFile(blob);
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const uploadFile = async (blob) => {
        try {
            if (!auth.currentUser) {
                return;
            }

            const uid = auth.currentUser.uid;

            // agregar un timestamp al nombre del archivo para hacerlo único
            const timestamp = Date.now();
            const filePath = `uploads/${uid}/${timestamp}`; 

            const storageRef = ref(storage, filePath);
            const uploadTask = uploadBytesResumable(storageRef, blob);
      
            uploadTask.on('state_changed',
                (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setTransferred(progress);
                }, 
                (error) => {
                    console.error(error);
                    setUploading(false);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // crear un nuevo objeto que incluye la URL de descarga y la ruta del archivo
                        const fileData = {
                            url: downloadURL,
                            path: filePath
                        };
          
                        setAdjuntos(prevState => [...prevState, fileData]); // add the new file data to the array
                        console.log('URL del archivo: ', downloadURL);
                        setUploading(false);
                    });
                }
            );
        } catch (err) {
            console.error('Error al subir el archivo: ', err);
        }
    }  

    return (
        <div {...getRootProps()} className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-gray-300 rounded bg-gray-100 cursor-pointer transition-colors ease-in-out duration-300 hover:border-adstream-500 w-11/12 max-w-xl">
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Suelta los archivos aquí ...</p> :
                <button disabled={uploading} className="mt-2 px-5 py-2 bg-adstream-500 text-white font-medium rounded cursor-pointer transition-colors duration-300 hover:bg-adstream-300 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    Adjuntar archivos
                </button>
            }

            {uploading && (
                <div className="flex flex-col items-center mt-5">
                    <p>
                        {transferred.toFixed(2)}% completado!
                    </p>
                    <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden mt-2.5">
                        <div 
                            className="h-full bg-adstream-500" 
                            style={{ width: `${transferred.toFixed(2)}%` }}
                        />
                    </div>
                    {!adjuntos && <ThreeDots color={'#b93a3f'} height={80} width={80} />}
                </div>
            )}

            {adjuntos.length > 0 && (
                <p className="mt-5 ml-0 text-center text-green-700 font-medium">
                    Archivo {adjuntos.length} subido correctamente!
                </p>
            )}
        </div>
    );
};

export default AdjuntarArchivos;