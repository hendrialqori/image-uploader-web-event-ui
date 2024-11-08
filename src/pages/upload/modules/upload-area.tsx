import React from "react"
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SparkMD5 from 'spark-md5';
import { GrCloudUpload } from "react-icons/gr";
import { FaRotateRight } from "react-icons/fa6";

import * as CONST from "#/constant"
import { cn, mockErrorResponse } from "#/utils"
import image_icon from "#/assets/image-icon.svg"
import { useUploadImage } from "#/services/upload-service";
import { FileHistory } from "#/@types";
import SuccessAnimation from "./success-animation";

const IMAGE_OPTIONS = [
    CONST.REUSABLE_UTENSILS, CONST.NON_REUSABLE_UTENSILS, CONST.WATER_CONTAINER_TUMBLER,
    CONST.PUBLIC_TRANSPORTATION, CONST.PERTAMAX_PERSONAL_VEHICLE, CONST.NON_PERTAMAX_PERSONAL_VEHICLE,
    CONST.ELECTRIC_VEHICLE, CONST.LITTER_FILTER, CONST.SINGLE_WASTE_BIN
]

type Props = {
    onUpdateHistory: (data: FileHistory) => void
}

export default function UploadArea(props: Props) {
    const queryClient = useQueryClient()

    const [file, setFile] = React.useState<File | null>(null)
    const [preview, setPreview] = React.useState<string | ArrayBuffer | null>()
    const [option, setOption] = React.useState("")
    const [md5, setMd5] = React.useState("")

    const [progressUpload, setProgressUpload] = React.useState(0)
    const [activeDropzone, setActiveDropzone] = React.useState(false)
    const [isShowAnimation, setShowAnimation] = React.useState(false)

    const upload = useUploadImage((event) => {
        const { loaded, total } = event
        const percentage = (loaded / Number(total)) * 100
        const progress = Number(percentage.toFixed(0))
        setProgressUpload(progress)
    })

    function imageReader(image: Blob) {
        const reader = new FileReader()
        reader.addEventListener("load", (event) => {
            const value = event.target?.result as string
            setPreview(value)
        })

        reader.readAsDataURL(image)
    }

    function handleChangeImageOption(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value
        setOption(value)
    }

    function handleChangeUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        // disabled when still image uploading
        if (isPending) return

        const [currentImage] = e.target.files as FileList

        const imageBlob = new Blob([currentImage])
        md5sumReader(imageBlob)

        const isValidSize = validationSize(currentImage)
        // const isValidOption = validationImageOption()
        if (isValidSize) {
            setFile(currentImage)
            imageReader(imageBlob)
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

    async function handleFileDroped(e: React.DragEvent<HTMLDivElement>) {
        // disabled when still image uploading
        if (isPending) return

        e.preventDefault()
        e.stopPropagation()

        setActiveDropzone(false)

        const [currentImage] = e.dataTransfer.files
        const imageBlob = new Blob([currentImage])
        md5sumReader(imageBlob)

        const isValidMimeType = validationMimeType(currentImage)
        const isValidSize = validationSize(currentImage)

        if (isValidMimeType && isValidSize) {
            setFile(currentImage)
        }
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
        const isOption = Boolean(option)
        if (!isOption) {
            toast.warning("Warning", {
                description: "Please select image type"
            })
        }
        return isOption
    }

    function md5sumReader(blob: Blob) {
        const reader = new FileReader()

        reader.addEventListener('load', function (event) {
            const file = event.target?.result
            const spark = new SparkMD5.ArrayBuffer()
            spark.append(file as ArrayBuffer)

            const result = spark.end()
            setMd5(result)

        })
        return reader.readAsArrayBuffer(blob)
    }

    function uploadImageAction() {
        const isValidOption = validationImageOption()
        if (!isValidOption) return

        const signal = new AbortController().signal
        const formData = new FormData()

        formData.append("image", file as File)
        formData.append("type", option)
        formData.append("md5", md5)

        upload.mutate({ formData, signal }, {
            onSuccess: (res) => {
                const message = res.message ?? "Success upload image"
                toast.success(message)

                setTimeout(() => queryClient.invalidateQueries({ queryKey: ["CREDENTIAL"] }), 1000)

                // upload history
                const history = {
                    file: preview as string, // base64
                    type: option,
                    metadata: {
                        name: file?.name ?? "",
                        size: file?.size ?? 0
                    }
                }
                props.onUpdateHistory(history)

                // reset state
                setFile(null)
                setOption("")
                setPreview("")
                setMd5("")
                setProgressUpload(0)

                // show modal animation
                setShowAnimation(true)
            },
            onError: (error) => {
                const errorType = mockErrorResponse[error.response?.data.type as keyof typeof mockErrorResponse]
                const errorMessage = error.response?.data.message ?? "Upload image failed"

                setTimeout(() => setProgressUpload(0), 1500)

                toast.error(errorType, {
                    description: errorMessage
                })
            }
        })
    }

    const isPending = upload.isPending
    const isError = upload.isError

    return (
        <React.Fragment>
            <div className="space-y-6 pt-8 md:pt-16">
                <div className="flex-center flex-col md:flex-row gap-3 justify-between text-sm md:text-base" aria-label="title">
                    <h2 className="font-semibold !-tracking-wide">Upload your image below</h2>
                    <select
                        className={cn("text-xs md:text-sm bg-white border border-gray-200 rounded-md p-2 font-medium disabled:opacity-50", option ? "opacity-100" : "opacity-70")}
                        value={option}
                        onChange={handleChangeImageOption}
                        disabled={isPending}
                    >
                        <option value="" disabled>Select image type</option>
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
                    aria-disabled={isPending}
                    key={preview as string}
                >
                    <div className="flex-center flex-col gap-2 md:gap-3">
                        <motion.img src={image_icon} className="size-10 md:size-16" alt="image-icon" initial={{ y: 0 }} animate={{ y: activeDropzone ? "-1rem" : "0" }} />
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
                {preview && (
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-5 pt-4 md:pt-5">
                        <img src={preview as string} alt="tumbnail" className="size-10 md:size-14 rounded-xl object-cover border border-gray-300" />
                        <div className="w-full flex-center gap-5">
                            <div className="w-full space-y-2">
                                <div className="flex-center justify-start gap-2">
                                    <p className="font-semibold !-tracking-wide text-xs md:text-sm">{file?.name}</p>
                                    <p className="text-center text-[0.65rem] md:text-xs bg-gray-200 rounded-full px-2 py-[0.05rem]" aria-label="badge">{option}</p>
                                </div>
                                <Progress value={progressUpload} />
                                <p className="text-gray-400 text-[0.65rem] md:text-xs">{(file?.size! / 1000_000).toFixed(2)} MB ({progressUpload}%)</p>
                            </div>
                            <button className="hover:outline hover:outline-black rounded-lg p-1" onClick={uploadImageAction} disabled={isPending}>
                                {isError ? <FaRotateRight className="text-xl text-red-500" /> : <GrCloudUpload className="text-2xl" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <SuccessAnimation
                isOpen={isShowAnimation}
                onClose={() => setShowAnimation(false)}
            />
        </React.Fragment>
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