import React, { useCallback, useState } from 'react';
import colors from '../../helpers/colors';
import { globalStyles } from '../../helpers/styles';
import { ThreeDots } from 'react-loader-spinner';
import { useDropzone } from 'react-dropzone';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth } from '../../helpers/firebase';

const AdjuntarArchivos = ({ adjuntos, setAdjuntos }) => {
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const storage = getStorage();

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
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <button disabled={uploading} style={{ backgroundColor: colors.adstream }}>
                    Adjuntar archivos
                </button>
            }

            {uploading && (
                <div style={{ paddingVertical: 10 }}>
                    <p style={[globalStyles.coloredText, { paddingVertical: 20, textAlign: 'center' }]}>
                        {transferred.toFixed(2)}% completado!
                    </p>
                    {!adjuntos && <ThreeDots color={colors.adstream} height={80} width={80} />}
                </div>
            )}

            {adjuntos.length > 0 && (
                <p style={[globalStyles.titleText, { textAlign: 'center', color: 'gray', paddingVertical: 10 }]}>
                    Archivo {adjuntos.length} subido correctamente!
                </p>
            )}
        </div>
    );
};

export default AdjuntarArchivos;

// import React, { useState } from 'react';
// import colors from '../../helpers/colors';
// import { globalStyles } from '../../helpers/styles';
// import { ThreeDots } from 'react-loader-spinner';

// const AdjuntarArchivos = ({ adjuntos, setAdjuntos }) => {
//     // ...
    
//     return (
//         <div>
//             {/* ... */}

//             {uploading && (
//                 <div style={{ paddingVertical: 10 }}>
//                     <p style={[globalStyles.coloredText, { paddingVertical: 20, textAlign: 'center' }]}>
//                         {transferred.toFixed(2)}% completado!
//                     </p>
//                     {!adjuntos && <ThreeDots color={colors.adstream} height={80} width={80} />}
//                 </div>
//             )}

//             {/* ... */}
//         </div>
//     );
// };

// export default AdjuntarArchivos;


// // import React, { useState } from 'react';
// // import colors from '../../helpers/colors';
// // import { globalStyles } from '../../helpers/styles';

// // const AdjuntarArchivos = ({ adjuntos, setAdjuntos }) => {
// //     const [uploading, setUploading] = useState(false);
// //     const [transferred, setTransferred] = useState(0);

// //     const selectDocument = async () => {
// //         // Implementar la lógica de selección de documentos para la web
// //     };

// //     const uploadFile = async (result) => {
// //         // Implementar la lógica de carga de archivos para la web
// //     };

// //     return (
// //         <div>
// //             <button onClick={selectDocument} disabled={uploading} style={{ backgroundColor: colors.adstream }}>
// //                 Adjuntar archivos
// //             </button>

// //             {uploading && (
// //                 <div style={{ paddingVertical: 10 }}>
// //                     <p style={[globalStyles.coloredText, { paddingVertical: 20, textAlign: 'center' }]}>
// //                         {transferred.toFixed(2)}% completado!
// //                     </p>
// //                     {!adjuntos && <ActivityIndicator size="large" color={colors.adstream} />}
// //                 </div>
// //             )}

// //             {adjuntos.length > 0 && (
// //                 <p style={[globalStyles.titleText, { textAlign: 'center', color: 'gray', paddingVertical: 10 }]}>
// //                     Archivo {adjuntos.length} subido correctamente!
// //                 </p>
// //             )}
// //         </div>
// //     );
// // };

// // export default AdjuntarArchivos;
