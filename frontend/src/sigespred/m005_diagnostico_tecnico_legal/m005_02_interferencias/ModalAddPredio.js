import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {agregar, listar} from "../../../actions/predios/Actions";
import {toastr} from 'react-redux-toastr'
import {initAxiosInterceptors} from "../../../config/axios";
const Axios = initAxiosInterceptors();

async function getsolicitudGestionPredial(cod_proy) {
    const {data} = await Axios.get(`/drpsolicituds-proy?codigo_proyecto=${cod_proy}`);
    return data;
}


 
const ModalAddPredio = ({closeModal,proyecto}) => {

    const [predio, setPredio] = useState({});
    const [solicituds, set_solicituds] = useState([]);

    const dispatch = useDispatch();
    const agregarAction = (pred) => dispatch(agregar(pred));


    const listar_action = (busqueda) => dispatch(listar(busqueda));
/*Funciona de inicalizacion de los combos */
    useEffect(() => {
        const init=async ()=>{

            let listsolicituds=await getsolicitudGestionPredial(proyecto);
            set_solicituds(listsolicituds);
        };
        init();


    }, []);

    /*FUncion que guarda el objeto predio*/
    function handleInputChange(e) {
        
        if(e.target.name=='codigo'){
            e.target.value= e.target.value.toUpperCase();
        }
        setPredio({
            ...predio,
            [e.target.name]: e.target.value
        });
    } 
    
    const registrar= async (e)=>{
        e.preventDefault();
        try{
            const response=await agregarAction({...predio,codigo_proyecto:proyecto});
            closeModal()
            listar_action(proyecto)
        }catch (e) {
        
            toastr.error('ERROR !!! el codigo ingresado ya existe.') 
        }
       
        
    }

    return (
        <>
            <div>
                <div id="lightCustomModal_background" className="popup_background backblq"
                ></div>
                <div id="lightCustomModal_wrapper" className="popup_wrapper bloqueador">
                    <div style={{transform:'scale(1)',alignContent:'left'}} className="custom-popup light  popup_content popup_content_visible bloqueador2" id="lightCustomModal"
                         data-popup-initialized="true" aria-hidden="false" role="dialog" aria-labelledby="open_20531909"

                         tabIndex="-1">
                        <a onClick={closeModal} href="#"  className="btn  m-right-sm lightCustomModal_close pull-right">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                        <div className=" " style={{width:'1100px'}}>
                            <div className="modal-header">

                                <h4>Registro de Predio</h4>
                            </div>
                            <form onSubmit={registrar}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Solicitud de Peticion Predial</label>
                                        <select name="" id=""     className="form-control input-sm">
                                            <option value="0">NINGUNO</option>
                                            {solicituds.map(item=>  <option value={item.id}>{item.denominacion}</option> )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Código del Predio</label>
                                        <input    
                                            required={'required'} 
                                            type="text" 
                                            className="form-control input-sm" 
                                            placeholder="Ingrese el código unico del Predio."
                                            
                                            name="codigo"
                                            onChange={handleInputChange}
                                            value={predio.codigo}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea
                                            required={'required'}
                                            type="text"
                                            className="form-control input-sm"
                                            placeholder="Ingrese la descripcion del Predios"
                                            name="descripcion"
                                            onChange={handleInputChange}
                                            value={predio.descripcion}
                                        />
                                    </div>

                            


                                </div>

                                <div className="modal-footer">
                                    <button id="btnguardar" type="submit"
                                            className="btn btn-danger btn-sm btn-control">Guardar
                                    </button>
                                    <button onClick={closeModal} type="button"
                                            className="btn btn-default btn-sm btn-control">Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>


                    </div>
                    <div className="popup_align bloqueador3" >

                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalAddPredio;