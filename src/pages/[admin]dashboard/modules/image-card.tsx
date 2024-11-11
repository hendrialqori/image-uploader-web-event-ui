import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { TbPencil } from "react-icons/tb";
import ModalDeleteImage from "./modal-delete-image";
import ModalUpdateImage from "./modal-update-image";
import { Image } from "#/@types";
import { STATIC } from "#/constant";

const MODAL_STATE = {
    update: false,
    delete: false
}

interface Props {
    image: Image
}

export default function ImageCard({ image }: Props) {
    const [modal, setModal] = React.useState(MODAL_STATE)

    function showModal(key: keyof typeof MODAL_STATE) {
        return () => setModal({ ...MODAL_STATE, [key]: true })
    }

    function hideModal() {
        setModal(MODAL_STATE)
    }

    return (
        <React.Fragment>
            <div className="grid grid-cols-5 md:grid-cols-7 border-b border-gray-200 py-4 w-full gap-5 md:gap-0">
                <img src={STATIC + "/" + image.title} alt="image" className="size-8 md:size-14 rounded-xl object-cover border border-gray-300" crossOrigin="anonymous" />
                <div className="col-span-2 md:col-span-4">
                    <p className="text-[0.65rem] md:text-xs font-medium text-gray-500">Category image</p>
                    <h3 className="text-[0.65rem] md:text-sm font-medium">{image.category}</h3>
                </div>
                <div>
                    <p className="text-[0.65rem] md:text-xs font-medium text-gray-500">Point</p>
                    <h3 className="text-[0.65rem] md:text-sm font-semibold">{image.point}</h3>
                </div>
                <div className="flex-center items-start gap-2 md:gap-4">
                    <button className="hover:outline hover:outline-black rounded-md p-1" onClick={showModal("update")}>
                        <TbPencil className="text-base md:text-2xl" />
                    </button>
                    <button className="hover:outline hover:outline-black rounded-md p-1" onClick={showModal("delete")}>
                        <FaRegTrashCan className="text-base md:text-2xl" />
                    </button>
                </div>
            </div>
            <ModalUpdateImage isOpen={modal.update} image={image} onClose={hideModal} />
            <ModalDeleteImage isOpen={modal.delete} image={image} onClose={hideModal} />
        </React.Fragment>
    )
}