import React from 'react'
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LearnPage = () => {
    const mechanic = useLoaderData();


  return (
    <>
        <div className="row text-center ">
            <h1 className="display-4 mini_custom_padding fw-bolder text-white">{mechanic.Title}</h1>
        </div>

        {/* <!--Interactive Demonstration and Coding Implementation layout --> */}

        <div className="row d-grid text-center">
            <div className="row justify-content-center text-center m-auto">
                <div className="col-md-6 justify-content-center text-center mx-md-3 gameMech-section-holders my-5">
                    <div className="row">
                        <h2 className="text-light fw-bolder">Interactive Demonstration</h2>
                    </div>
                    <div className="ratio ratio-16x9 d-grid m-auto mb-3 pb-3">
                        <iframe src="{UnityLink}" className="unityLayout m-auto" allowfullscreen title={`${mechanic.Title}`}></iframe>
                    </div>
                    <div>
                        <h4 className="text-light fw-bolder gameMech-padding-Title pb-3">INTERACTIVE CONTROLS</h4>
                    </div>
                    <div style="text-align: center;">
                        <div style="display: inline-block; text-align: left;">
                            <p className="text-light m-0 gameMech-padding-text fs-6">{mechanic.InteractiveControls}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 d-grid gameMech-section-holders mx-md-3 my-5 ">
                    <div className="row">
                        <h2 className="text-light fw-bolder">Coding Implementation</h2>
                        <div className="col align-items-end text-end">
                            <button className="copy_button text-end" type="button" onclick="copyCodeText()" data-bs-toggle="tooltip" data-bs-placement="top" title="Copy to Clipboard">
                                <i className="fa-solid fa-copy" aria-hidden="true"></i> Copy code
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-center m-auto gameMech-code-holder">
                        <pre>
                            <code className="language-csharp" id="codeText">{GetFormattedCodeText()}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>


    </>
  )
}

export default LearnPage
