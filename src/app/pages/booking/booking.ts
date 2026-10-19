import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking {
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  async submitBooking(event: Event): Promise<void> {
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

    const booking = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      destination: String(formData.get('destination') || ''),
      date: String(formData.get('date') || ''),
      travelers: Number(formData.get('travelers')),
      requirements: String(formData.get('requirements') || '').trim()
    };

    this.successMessage = '';
    this.errorMessage = '';
    this.isSubmitting = true;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking),
        signal: controller.signal
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || 'Unable to save your booking.'
        );
      }

      this.successMessage =
        'Booking submitted successfully! Your request has been saved. We will contact you to confirm your trip.';

      form.reset();
    } catch (error) {
      console.error('Booking submission failed:', error);

      if (error instanceof Error && error.name === 'AbortError') {
        this.errorMessage =
          'The request timed out. Please check your connection and try again.';
      } else {
        this.errorMessage =
          error instanceof Error
            ? error.message
            : 'Unable to submit your booking. Please try again.';
      }
    } finally {
      clearTimeout(timeoutId);
      this.isSubmitting = false;
    }
  }
}
