
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  async submitContact(event: Event): Promise<void> {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (this.isSubmitting) {
      return;
    }

    const formData = new FormData(form);

    const contact = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      subject: String(formData.get('subject') || '').trim(),
      message: String(formData.get('message') || '').trim()
    };

    this.successMessage = '';
    this.errorMessage = '';
    this.isSubmitting = true;

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Could not send your message.');
      }

      this.successMessage =
        'Thank you for contacting WanderWay! Your message has been saved successfully.';

      form.reset();
    } catch (error) {
      console.error('Contact form submission failed:', error);

      this.errorMessage =
        error instanceof Error
          ? error.message
          : 'Unable to send your message. Please try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}


