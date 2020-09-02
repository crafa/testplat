import React, {useEffect, useState} from 'react';


const File = ({eliminarFile,props,serverFile}) => {
    
     
    const {filename,path,id,denominacion}=props;
    const [idcomp,setId]= useState(null);

    useEffect(() => {
        setId(id)

    }, []);
    
    /*Eliminando archivos*/
    const eliminarArchivo=(e)=>{
        eliminarFile(idcomp)
    }
    
    return (
        <>
            <li className=" clearfix file-content" >
                <div className="pull-left m-left-sm ">
                    <span><b>{denominacion}</b> :</span><br></br>
                </div>
                <div className="pull-left m-left-sm ">
                    <span>{filename}</span><br></br>
                  </div>

               
                <div className="btn-group hover-dropdown pull-right">
                    <a href={`${serverFile}${path}`} target={'_blank'} className="btn btn-xs btn-default" type="button">
                        <i className="fa fa-download fa-lg"></i> </a>

                    <a onClick={eliminarArchivo} href={'#'}  className="btn btn-xs btn-default" type="button"><i
                        className="fa fa-trash-o fa-lg"></i></a>
                </div>
            </li>
        </>
    );
};

export default File;