/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: iletisimformugonderimleri
 * Interface for LetiimFormuGnderimleri
 */
export interface LetiimFormuGnderimleri {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  senderName?: string;
  /** @wixFieldType text */
  senderEmail?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  submissionDateTime?: Date | string;
}


/**
 * Collection ID: ucuslarr
 * Interface for Uular
 */
export interface Uular {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  flightNumber?: string;
  /** @wixFieldType text */
  departureLocation?: string;
  /** @wixFieldType text */
  arrivalLocation?: string;
  /** @wixFieldType date */
  departureDate?: Date | string;
  /** @wixFieldType time */
  departureTime?: any;
  /** @wixFieldType time */
  arrivalTime?: any;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  duration?: string;
  /** @wixFieldType text */
  aircraftType?: string;
}
