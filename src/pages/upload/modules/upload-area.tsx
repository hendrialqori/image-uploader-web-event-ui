import React from "react"
import { SlClose } from "react-icons/sl";
import { toast } from "sonner";
import { motion } from "framer-motion";
import * as CONST from "#/constant"
import { cn } from "#/utils"
import image_icon from "#/assets/image-icon.svg"

const IMAGE_OPTIONS = [
    CONST.REUSABLE_UTENSILS, CONST.NON_REUSABLE_UTENSILS, CONST.WATER_CONTAINER_TUMBLER,
    CONST.PUBLIC_TRANSPORTATION, CONST.PERTAMAX_PERSONAL_VEHICLE, CONST.NON_PERTAMAX_PERSONAL_VEHICLE,
    CONST.ELECTRIC_VEHICLE, CONST.LITTER_FILTER, CONST.SINGLE_WASTE_BIN
]

export default function UploadArea() {
    const [imageOption, setImageOption] = React.useState("")
    const [image, setImage] = React.useState<File | null>(null)
    const [activeDropzone, setActiveDropzone] = React.useState(false)

    function handleChangeImageOption(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value
        setImageOption(value)
    }

    function handleChangeUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        const [currentImage] = e.target.files as FileList

        const isValidSize = validationSize(currentImage)
        const isValidOption = validationImageOption()
        if (isValidOption && isValidSize) {
            setImage(currentImage)
        }
    }

    function handleFileEnter(e: React.DragEvent) {
        e.preventDefault()
        setActiveDropzone(true)
    }

    function handleFileLeave(e: React.DragEvent) {
        e.preventDefault()
        setActiveDropzone(false)
    }

    function handleFileDroped(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()

        setActiveDropzone(false)

        const [currentImage] = e.dataTransfer.files

        const isValidMimeType = validationMimeType(currentImage)
        const isValidSize = validationSize(currentImage)
        const isValidOption = validationImageOption()

        if (isValidMimeType && isValidSize && isValidOption) {
            setImage(currentImage)
        }
    }

    function cencelUpload() {
        setImage(null)
    }


    function validationSize(image: File) {
        const ALLOW_MAX_SIZE = 2_300_000; //2mb
        const fileSize = image.size

        if (fileSize > ALLOW_MAX_SIZE) {
            toast.error("Image validation error", {
                description: "Max size is 2MB"
            })
            return false
        }

        return true
    }

    function validationMimeType(image: File) {
        const ALLOW_MIME_TYPE = ["image/png", "image/jpg", "image/jpeg"]
        const fileType = image.type

        const checkIsValid = ALLOW_MIME_TYPE.includes(fileType)
        if (!checkIsValid) {
            toast.error("Image validation error", {
                description: "Only accept *.jpg, *.jpeg and *.png"
            })
            return false
        }
        return true
    }

    function validationImageOption() {
        const isOption = Boolean(imageOption)
        if (!isOption) {
            toast.warning("Warning", {
                description: "Please select image type"
            })
        }

        return isOption
    }


    return (
        <div className="space-y-6 pt-8 md:pt-16">
            <div className="flex-center flex-col md:flex-row gap-3 justify-between text-sm md:text-base" aria-label="title">
                <h2 className="font-semibold !-tracking-wide">Upload your image below</h2>
                <select
                    className={cn("text-xs md:text-sm bg-white border border-gray-200 rounded-md p-2 font-medium", imageOption ? "opacity-100" : "opacity-70")}
                    value={imageOption}
                    onChange={handleChangeImageOption}
                >
                    <option value="" disabled selected>Select image type</option>
                    {IMAGE_OPTIONS.map((value, i) => (
                        <option key={i} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div
                className="w-full bg-white border-2 border-dashed border-gray-200 rounded-xl flex-center py-16 select-none"
                onDragOver={handleFileEnter}
                onDragLeave={handleFileLeave}
                onDrop={handleFileDroped}
                aria-label="dropzone"
            >
                <div className="flex-center flex-col gap-3">
                    <motion.img src={image_icon} className="size-12 md:size-16" alt="image-icon" initial={{ y: 0 }} animate={{ y: activeDropzone ? "-1rem" : "0" }} />
                    <div>
                        <div className="flex-center gap-1 text-sm md:text-base">
                            {activeDropzone ? <p className="font-medium text-[#2F5C8B]">Just like that!</p> : (
                                <React.Fragment>
                                    <h3 className="font-medium text-[#2F5C8B]">Drop your image here,</h3>
                                    <label htmlFor="image" className="font-bold text-[#3293FF] hover:underline cursor-pointer">or browse</label>
                                </React.Fragment>
                            )}
                        </div>
                        <input id="image" type="file" onChange={handleChangeUploadImage} accept=".jpeg, .jpeg, .png" className="hidden" />
                    </div>
                    <p className="text-xs md:text-sm text-gray-400">Support JPG, JPEG, PNG</p>
                </div>
            </div>
            {image && (
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 pt-4 md:pt-5">
                    <img src={URL.createObjectURL(image)} alt="tumbnail" className="size-10 md:size-14 rounded-xl object-cover border border-gray-300" />
                    <div className="w-full flex-center gap-3">
                        <div className="w-full space-y-2">
                            <p className="font-semibold !-tracking-wide text-xs md:text-sm">{image.name}</p>
                            <Progress value={60} />
                            <p className="text-gray-400 text-[0.65rem] md:text-xs">1.20 of {(image.size / 1000_000).toFixed(2)} MB (75%)</p>
                        </div>
                        <button type="button" onClick={cencelUpload}>
                            <SlClose className="text-red-500 text-2xl" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

function Progress({ value }: { value: number }) {
    return (
        <div className="relative overflow-hidden w-full  h-[0.50rem] md:h-[0.65rem] rounded-2xl bg-gray-200" aria-label="progress">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ bounce: false, duration: 0.1 }}
                className="h-[0.50rem] md:h-[0.65rem] bg-[#3293FF] transition duration-300"
                aria-label="progress-value"
            />
        </div>
    )
}