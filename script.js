let filters = {
    brightness: {
        value: 100,
        min:0,
        max:200,
        unit: "%"
    },
    contrast:{
        value: 100,
        min:0,
        max:200,
        unit: "%"
    },
    
    saturation :{
        value: 100,
        min:0,
        max:200,
        unit: "%"
    },
    hueRotation:{
        value: 0,
        min:0,
        max:200,
        unit: "deg"
    },
    blur: {
        value: 0,
        min:0,
        max:200,
        unit: "px"
    },
    grayscale:{
        value: 0,
        min:0,
        max:200,
        unit: "%"
    },
    sepia: {
        value: 0,
        min:0,
        max:200,
        unit: "%"
    },
    opacity:{
        value: 100,
        min:0,
        max:200,
        unit: "%"
    },
    invert: {
        value: 0,
        min:0,
        max:200,
        unit: "%"
    }
}
const imageCanvas = document.querySelector("#image-canvas")
const filterContainer = document.querySelector(".filters")
const imgInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
const resetButton = document.querySelector('#reset-btn')
const downloadButton = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")
let file = null;
let image= null;

function createFilterElement(name,unit="%",value,min,max){
  const div = document.createElement("div")
  div.classList.add("filter")

  const input = document.createElement("input")
  input.type="range"
  input.min = min
  input.max = max
  input.value = value
  input.id = name

  const p = document.createElement("p")
  p.innerText = name

  div.appendChild(p)
  div.appendChild(input)

  input.addEventListener("input" , (event)=>{
    filters[name].value = input.value
    applyFilters()
  })

  return div
}


function createFilters(){
    Object.keys(filters).forEach(key =>{
    // console.log(key,filters[key])
    const filterElement = createFilterElement(key, filters[key].unit, filters[key].value,filters[key].min, filters[key].max)
    filterContainer.appendChild(filterElement)

})
}
createFilters()

imgInput.addEventListener("change",(event)=>{
    const file= event.target.files[0]
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceholder.style.display= "none"
 
    const img = new Image()
    img.src= URL.createObjectURL(file)// isse image ko url mein convert krte hai

    img.onload =() =>{
        image  = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img,0,0)
    }
})

function applyFilters(){
    canvasCtx.clearRect(0,0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter =`
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit}) 
   
    `
    

    
    
    
    canvasCtx.drawImage(image,0,0)
}
resetButton.addEventListener("click",()=>{
filters = {
    brightness: {
        value: 100,
        min:0,
        max:200,
        unit: "%"
    },
    contrast:{
        value: 100,
        min:0,
        max:200,
        unit: "%"
    },
    
    saturation :{
        value: 100,
        min:0,
        max:200,
        unit: "%"
    },
    hueRotation:{
        value: 0,
        min:0,
        max:200,
        unit: "deg"
    },
    blur: {
        value: 0,
        min:0,
        max:200,
        unit: "px"
    },
    grayscale:{
        value: 0,
        min:0,
        max:200,
        unit: "%"
    },
    sepia: {
        value: 0,
        min:0,
        max:200,
        unit: "%"
    },
    opacity:{
        value: 100,
        min:0,
        max:200,
        unit: "%"
    },
    invert: {
        value: 0,
        min:0,
        max:200,
        unit: "%"
    }
}
applyFilters()

filterContainer.innerHTML = ""
createFilters()
})
downloadButton.addEventListener("click",()=>{
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
    original: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    drama: {
        brightness: 95,
        contrast: 145,
        saturation: 125,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 105,
        contrast: 90,
        saturation: 75,
        hueRotation: 350,
        blur: 0.3,
        grayscale: 10,
        sepia: 35,
        opacity: 100,
        invert: 0
    },

    oldSchool: {
        brightness: 110,
        contrast: 85,
        saturation: 65,
        hueRotation: 0,
        blur: 0.5,
        grayscale: 15,
        sepia: 45,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 90,
        contrast: 135,
        saturation: 85,
        hueRotation: 10,
        blur: 0,
        grayscale: 5,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    blackAndWhite: {
        brightness: 105,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 110,
        contrast: 90,
        saturation: 115,
        hueRotation: 340,
        blur: 0,
        grayscale: 0,
        sepia: 25,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 110,
        contrast: 105,
        saturation: 120,
        hueRotation: 350,
        blur: 0,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 115,
        saturation: 95,
        hueRotation: 190,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 115,
        contrast: 85,
        saturation: 110,
        hueRotation: 0,
        blur: 1,
        grayscale: 0,
        sepia: 5,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 115,
        contrast: 75,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    vibrant: {
        brightness: 105,
        contrast: 115,
        saturation: 165,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    moody: {
        brightness: 80,
        contrast: 140,
        saturation: 75,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    soft: {
        brightness: 110,
        contrast: 90,
        saturation: 95,
        hueRotation: 0,
        blur: 0.5,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    negative: {
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 100
    }
};

Object.keys(presets).forEach(presetName =>{
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerText = presetName
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener("click",()=>{
        const preset  = presets[presetName]
        
        Object.keys(preset).forEach(filterName =>{
            filters[filterName].value = preset[filterName]
        })
        applyFilters()
        filterContainer.innerHTML = ""
        createFilters()
         
    })
})




