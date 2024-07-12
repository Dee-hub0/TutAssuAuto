<script setup lang="ts">
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import FormWizard from './components/FormWizard.vue';
import FormStep from './components/FormStep.vue';

// settinf meta, title tags
useHead({
  title: 'Assu Auto',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
})

// The Form onSubmit Function 
async function onSubmit(formData) {
  // Using $fetch to call the endpoint API
  const data = await $fetch('http://localhost:8000/api/subscription', {
    method: 'POST',
    body: formData
  })
// retreiving the results and showing a succes/error message
  if(data.status == 200){
    alert('Félicitation souscription réussie.')
  }else{
    alert('Souscription non-réussie, merci de réessayer')
  }
}

// The phone number field regex
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// break down the validation steps into multiple schemas
const validationSchema = [
  yup.object({}),
  yup.object({}),
  yup.object({
    lastName: yup.string().required('Ce champs est obligatoire'),
    firstName: yup.string().required('Ce champs est obligatoire'),
    email: yup.string().required('Ce champs est obligatoire').email('Email invalide'),
    birthPlace: yup.string().required('Ce champs est obligatoire'),
    tel: yup.string().required('Ce champs est obligatoire').matches(phoneRegExp, 'Numéro de téléphone invalide'),
    postCode: yup.string().required('Ce champs est obligatoire'),
    city: yup.string().required('Ce champs est obligatoire'),
    profession: yup.string().required('Ce champs est obligatoire'),
  }),
  yup.object({
    startDate: yup.string().required('Ce champs est obligatoire'),
    brand: yup.string().required('Ce champs est obligatoire'),
    model: yup.string().required('Ce champs est obligatoire'),
    numberPlate: yup.string().required('Ce champs est obligatoire'),
  }),
];

</script>

<template>

    <FormWizard :validation-schema="validationSchema" @submit="onSubmit">
      <FormStep>
        <h6 class="mt-4 mb-2 text-sm">Bienvenue.</h6>
          <p class="mb-2 max-w-65 max-w-full md:max-w-65 lg:max-w-65 xl:max-w-65 2xl:max-w-65 text-center m-auto">
             Notre <b>assistance auto</b> est conçu pour vous offrir une tranquillité d’esprit totale lors de vos déplacements. Nous sommes disponibles <b>24 heures sur 24, 7 jours sur 7, où que vous soyez,</b> mettant ainsi votre sécurité au cœur de notre engagement.
          </p>
          <div class="flex justify-center sm:max-w-96 md:max-w-65 lg:max-w-65 xl:max-w-65 2xl:max-w-65 m-auto mt-8">
              <video class="w-full h-auto aspect-video" autoplay muted controls>
              <source src="/video/camion_1.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          
      </FormStep>

      <FormStep>
        <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 p-8 gap-1">
          <div>
            <img class="m-auto h-auto max-w-40 sm:max-w-40 md:max-w-64 lg:max-w-64 2xl:max-w-64 mt-4 mb-5" src="/images/titre.png" alt="" />
          </div>
          <div>
            <img class="m-auto h-auto max-w-40 sm:max-w-40 md:max-w-64 lg:max-w-64 2xl:max-w-64 mt-4 mb-5" src="/images/etape2.png" alt="" />
          </div>
          <div>
        <p class="mb-2 w-full text-center m-auto">
          Chez <span class="text-theme-violet font-medium">Tutassur</span>, rien de plus simple pour vous assurer. Il vous suffit de nous envoyer ces quelques informations et nous nous chargeons du reste !
        </p>
      </div>

      </div>
        <img class="m-auto h-auto xs:w-24 sm:w-24 md:w-64 lg:w-64 mt-4 mb-5" src="/images/Personnage_reflexion.png" alt="" />
        <p class="mb-2 mt-2 max-w-65 max-w-full md:max-w-65 lg:max-w-65 xl:max-w-65 2xl:max-w-65 text-center m-auto">
          Ne vous inquiétez pas, le processus est simple et se déroulera en deux étapes rapides.
        </p>
        <img class="m-auto max-w-32 mt-8 mt-4" src="/images/Presentation_etape.png" alt="" />
      </FormStep>


      <FormStep>
        <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 p-4 gap-1">
          <div>
            <img class="m-auto h-auto sm:w-24 md:w-64 lg:w-64 mt-4 mb-5" src="/images/titre.png" alt="" />
          </div>
          <div>
            <img class="m-auto h-auto sm:w-24 md:w-64 lg:w-64 xl:w-64 2xl:w-64 mt-4 mb-5" src="/images/etape1.png" alt="" />
          </div>
          <div>
        <p class="mb-2 w-full text-center m-auto">
          Pour souscrire à notre Assistance Auto, nous vous demandons de remplir certains <b>champs obligatoires</b>. Ces informations sont essentielles pour personnaliser nos services en fonction de vos besoins spécifiques.
        </p>
       

        <p class="text-xs text-theme-gray mb-2 max-w-65 max-w-full md:max-w-65 lg:max-w-65 xl:max-w-65 2xl:max-w-65 text-center m-auto">
          Soyez assuré que nous traitons vos données avec la plus grande confidentialité et dans le respect des réglementations en vigueur concernant la protection des données personnelles.
        </p>
      </div>
    </div>

        <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 p-4">

          <div class="flex flex-wrap  bg-theme-red-gray">
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <img class="m-auto max-w-8 mt-8 mt-4" src="/images/Carte_identite.png" alt="" />
            </div>
          <div class="w-full md:w-3/4 px-3 text-left">

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="lastName" type="text" placeholder="Nom : " />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="lastName" />

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="firstName" type="text" placeholder="Prénom : " />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="firstName" />

          </div>
         </div>


         <div class="flex flex-wrap  bg-theme-red-gray">
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <img class="m-auto max-w-8 mt-8 mt-4" src="/images/Gateau.png" alt="" />
            </div>
          <div class="w-full md:w-3/4 px-3 text-left">

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="birthDate" type="date" placeholder="Date de naissance : " />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="birthDate" />

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="birthPlace" type="text" placeholder="Lieu de naissance : " />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="birthPlace" />

          </div>
         </div>



         <div class="flex flex-wrap  bg-theme-red-gray">
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <img class="m-auto max-w-8 mt-8 mt-4" src="/images/Telephone.png" alt="" />
            </div>
          <div class="w-full md:w-3/4 px-3 text-left">

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="email" type="email" placeholder="Adresse e-mail :" />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="email" />

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="tel" type="tel" placeholder="Téléphone : " />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="tel" />

          </div>
         </div>

         </div>



         <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4">

          <div class="flex flex-wrap  bg-theme-red-gray">
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <img class="m-auto max-w-8 mt-8 mt-4" src="/images/Personnage_telephone.png" alt="" />
            </div>
          <div class="w-full md:w-3/4 px-3 text-left">

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="postCode" placeholder="Code Postal : " />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="postCode" />

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="profession" placeholder="Profession :" />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="profession" />

          </div>
          </div>

          <div class="flex flex-wrap  bg-theme-red-gray">
            <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <img class="m-auto max-w-8 mt-8 mt-4" src="/images/Personne_chemise_rouge.png" alt="" />
            </div>
          <div class="w-full md:w-3/4 px-3 text-left">

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="city" placeholder="Ville : " />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="city" />

            <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="familyStatus" placeholder="Situation familiale : " />
            <ErrorMessage class="text-theme-xs text-red-500 text-left" name="familyStatus" />

          </div>
          </div>



          </div>


      </FormStep>

      <FormStep>
        <div class="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 p-4 gap-1">
          <div>
            <img class="m-auto h-auto sm:w-24 md:w-64 lg:w-64 mt-4 mb-5" src="/images/titre.png" alt="" />
          </div>
          <div>
            <img class="m-auto h-auto sm:w-24 md:w-64 lg:w-64 xl:w-64 2xl:w-64 mt-4 mb-5" src="/images/etape2.png" alt="" />
          </div>
    

        <div>
          <p class="mb-2 w-full text-center m-auto">
          Lors de cette souscription, nous aurons également besoin d’informations essentielles concernant votre véhicule. Cela nous permettra de personnaliser nos services en fonction de vos besoins spécifiques et de vous offrir une expérience sur mesure.
        </p>
        </div>
        
      </div>

        <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 p-4">

              <div class="flex flex-wrap">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <img class="m-auto max-w-48 mt-8 mt-4" src="/images/Voiture.png" alt="" />
                </div>
              <div class="w-full md:w-1/2 px-3 py-4 bg-theme-red-gray">
  
                <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="startDate" placeholder="Date de mise en circulation :" />
                <ErrorMessage class="text-theme-xs text-red-500 text-left" name="startDate" />

                <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="model" placeholder="Modèle :" />
                <ErrorMessage class="text-theme-xs text-red-500 text-left" name="model" />

                <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="brand" placeholder="Marque :" />
                <ErrorMessage class="text-theme-xs text-red-500 text-left" name="brand" />

                <Field class="w-full text-xs px-3 py-2 rounded-full bg-zinc-200 border-0 mb-0" name="numberPlate" placeholder="Immatriculation :" />
                <ErrorMessage class="text-theme-xs text-red-500 text-left" name="numberPlate" />

              </div>
              </div>

        </div>
    
      </FormStep>

    </FormWizard>

<section class="bg-stone-100 flex flex-row text-center justify-items-stretch place-items-center md:items-center md:text-center">
  <div class="basis-1/2 bg-none text-theme-gray mt-0 m-auto text-center text-xs px-4">
            <p>
              TUTASSUR GRENOBLE SAS au capital de 3000€ - RCS GRENOBLE 919 676 817 – SIRET 919 676 817 00019 – APE 6622Z Siège social : 4 Boulevard Gambetta – 38000 Grenoble – Tél. + 33 (0)4.65.84.25.34 - TVA Intracommunautaire FR02919676817 Cabinet de courtage en assurance immatriculé à l’ORIAS (www.orias.fr) sous le numéro 22005579 Sous le contrôle de l’Autorité de Contrôle Prudentiel et de Résolution (ACPR) – 4 place de Budapest 75009 PARIS.
            </p>
 </div>
</section>
</template>

<style>
input,
select {
  margin: 10px 0;
  display: block;
}
</style>
