export const getRefineryContent = (item) =>
  `<div class="google-maps-marker-content pa-4">
    <h1 class="google-maps-marker-content__title mb-4 text-no-wrap">${item.name}</h1>

    <div class="v-divider my-3"></div>
    <div class="google-maps-marker-content__text">
      <div class="mb-1">
        <span class="text-caption text-secondary">owner:</span>
        <strong class="font-weight-medium text-primary text-body-1">${item.owner}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">company:</span>
        <strong class="font-weight-medium">${item.company}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">country:</span>
        <strong class="font-weight-medium">${item.country}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">location:</span>
        <strong class="font-weight-light">${item.location.lat}, ${item.location.lng}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">region:</span>
        <strong class="font-weight-medium">${item.region}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">administrativeDistrict:</span>
        <strong class="font-weight-medium">${item.administrativeDistrict}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">federalSubject:</span>
        <strong class="font-weight-medium">${item.federalSubject}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">city:</span>
        <strong class="font-weight-medium">${item.city}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">complex:</span>
        <strong class="font-weight-medium">${item.complex}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">refinery:</span>
        <strong class="font-weight-medium">${item.refinery}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">fullNameEn:</span>
        <strong class="font-weight-medium">${item.fullNameEn}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">fullNameRu:</span>
        <strong class="font-weight-medium">${item.fullNameRu}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">name:</span>
        <strong class="font-weight-medium">${item.name}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">mTPerYear:</span>
        <strong class="font-weight-black text-info text-body-1">${item.mTPerYear}</strong>
      </div>
      <div class="mb-1">
        <span class="text-caption text-secondary">Attacks:</span>
        <strong class="font-weight-black text-info text-body-1">${ item.attacks?.map(attack => attack.consequences).join(', ') }</strong>
      </div>
      <div class="mt-2">
        <span class="text-caption text-secondary">%:</span>
        <strong class="font-weight-black text-info text-body-1">${item.massPercentage}</strong>
      </div>

      <div class="v-divider my-3"></div>

      <div class="v-progress-linear v-progress-linear--active v-theme--dark v-locale--is-ltr" role="progressbar" aria-hidden="false" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${item.massPercentage}" style="top: 0px; height: 24px; --v-progress-linear-height: 24px;">
        <div class="v-progress-linear__background bg-primary"></div>
        <div class="v-progress-linear__buffer bg-secondary" style="opacity: 0.5; width: ${item.massPercentage}%;"></div>
        <div class="v-progress-linear__determinate bg-primary" style="width: ${item.massPercentage}%;"></div>
        <div class="v-progress-linear__content">
          <div class="d-flex justify-space-around w-100 px-4">
            <div class="text-caption">${item.massPercentage}% (${item.mTPerYear}/344 mln t/y)</div>
            <!--          <div class="text-caption">{{ totalPercentage }}%</div>-->
          </div>
        </div>
      </div>

      <div class="v-divider my-3"></div>

      <ul>
        <li>Drone attacks</li>
      </ul>
    </div>
  </div>`
